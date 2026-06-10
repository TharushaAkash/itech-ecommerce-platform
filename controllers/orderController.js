import Order from "../models/Order.js";
import Product from "../models/Product.js";


export default async function createOrder(req, res) {
    const user = req.user;
    if (!user) {
        res.status(401).json({
            message: "You need to be logged in to place an order"
        })
        return;
    }

    // let orderId = "ORD00000001";
    const orderData = {
        orderId: "ORD00000001",
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        addressLineOne: req.body.addressLineOne,
        addressLineTwo: req.body.addressLineTwo,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        phone: req.body.phone,
        total: 0,
        items: []
    }

    if(req.body.firstName != null && req.body.firstName != ""){
        orderData.firstName = req.body.firstName;
        orderData.lastName = req.body.lastName;
    }
    try{
        const lastOrder = await Order.findOne().sort({date: -1});
        if(lastOrder != null){
            const lastOrderId = lastOrder.orderId;
            const lastOrderNumberInString = lastOrderId.replace("ORD", "");
            const lastOrderNumber = parseInt(lastOrderNumberInString);
            const newOrderNumber = lastOrderNumber + 1;
            const newOrderNumberInString = newOrderNumber.toString().padStart(8, "0");
            orderData.orderId = "ORD" + newOrderNumberInString;

        }

        for(let i = 0; i < req.body.items.length; i++){
            const product= await Product.findOne({productId: req.body.items[i].productId});
            if(product == null || !product.isAvailable){
                res.status(400).json({
                    message: "product with id " + req.body.items[i].productId + " not found"
                })
                return;
            }else{

                orderData.items.push({
                    product: {
                        productId: product.productId,
                        name: product.name,
                        price: product.price,
                        labeledPrice: product.labeledPrice,
                        image: product.images[0]
                    },
                    quantity: req.body.items[i].quantity
                })

                orderData.total += product.price * req.body.items[i].quantity;
            }
        }

        const newOrder = new Order(orderData);
        await newOrder.save();
        res.status(201).json({
            message: "Order placed successfully",
            orderId: newOrder.orderId
        })

    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message: "An error occurred while placing the order"
        })
    }
}


//Getter method for products
export async function getOrders(req, res){
    try{
        if(req.user == null){
            res.status(401).json({
                message: "You need to be logged in to view your orders"
            })
            return;
        }

        const pageSize = parseInt(req.params.pageSize || "10")
        const pageNumber = parseInt(req.params.pageNumber || "1")

        if(req.user.isAdmin){

            const orderCount = await Order.countDocuments(); //Get how many orders in the data base

            //Calculate the pages
            const totalPages = Math.ceil(orderCount / pageSize); //Round up to the nearest integer by Math.ceil
            const orders = (await Order.find().sort({date: -1}).skip((pageNumber - 1) * pageSize).limit(pageSize));
            res.status(200).json({
                totalPages: totalPages,
                pageSize: pageSize,
                orderCount: orderCount,
                orders: orders,
                message: "Orders fetched successfully"
            })

        }else{
            const orderCount = await Order.countDocuments({email: req.user.email}); //Get how many orders the user has placed
            const totalPages = Math.ceil(orderCount / pageSize)
            const orders = await Order.find({email: req.user.email}).sort({date: -1}).skip((pageNumber - 1) * pageSize).limit(pageSize);
            res.status(200).json({
                totalPages: totalPages,
                orders: orders,
                pageSize: pageSize,
                orderCount: orderCount,
                message: "Orders fetched successfully"
            })
        }

    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message: "An error occurred while fetching the orders"
        })
    }
}

export async function updateStatusAndNotes(req, res){
    if(req.user == null || !req.user.isAdmin){
        res.status(401).json(
            {
                message: "Admins can do this operation.."
            }
        )
        return;
    }

    try{
        const status = req.body.status
        const notes = req.body.notes
        const orderId = req.params.orderId
        const response = await Order.findOneAndUpdate(
            {orderId: orderId},
            {status: status, notes: notes}

        )
        res.status(200).json(
            {
                message: "Order status and notes updated successfully"
            }
        )

    }catch(err){
        console.log(err.message);
        res.status(500).json(
            {
                message: "Internal Server Error.."
            }
        )
    }
}