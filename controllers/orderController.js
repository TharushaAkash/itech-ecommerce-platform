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