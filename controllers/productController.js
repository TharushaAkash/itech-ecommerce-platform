import Product from "../models/product.js";
import isAdmin from "./userController.js";

//Create a product

export async function createProduct(req, res){
    
    if(!isAdmin(req)){
        res.status(403).json(
            {
                message: "Only Admin Can Create Product"
            }
        )
        return;
    }

    try{
        const existingProduct = await Product.findOne({productId: req.body.productId});

        if(existingProduct != null){
            res.status(400).json(
                {
                    message: "Product Already exists with this productid"
                }
            )
            return;
        }

        const newProduct = new Product(
            {
                productId: req.body.productId,
                name: req.body.name,
                altNames: req.body.altNames,
                price: req.body.price,
                labeledPrice: req.body.labeledPrice,
                description: req.body.description,
                images: req.body.images,
                brand: req.body.brand,
                model: req.body.model,
                category: req.body.category,
                isAvailable: req.body.isAvailable,
                stock: req.body.stock

            }
        )

        await newProduct.save();
        res.status(201).json(
            {
                message: "Product Created Successfully.."
            }
        )

    }catch(err){
        res.status(500).json(
            {
                message: "Error creating Product",
                error: err.message
            }
        )
    }
}


//Get all products
export async function getAllProducts(req, res){
    try{

        if(isAdmin(req)){
        const products = await Product.find();
        res.status(200).json(
            {
                message: "Products fetched successfully",
                products: products
            }
        )
    }

    else{
        const products = await Product.find({isAvailable: true});
        res.status(200).json(
            {
                message: "Product fetched Successfully",
                products: products
            }
        )
    }

    }catch(err){
        res.status(500).json(
            {
                message: "Error fetching Products..",
                error: err.message
            }
        )
    }
}


//Delete product
export async function deleteProduct(req, res){
    if(!isAdmin(req)){
        res.status(403).json(
            {
                message: "Only Admin can delete product"
            }
        )
        return;
    }

    try{
        await Product.deleteOne({productId: req.params.productId});
        res.status(200).json(
            {
                message: "Product deleted successfully"
            }
        )
    }catch(err){
        res.status(500).json(
            {
                message: "Error deleting product",
                error: err.message
            }
        )
    }
}



//Update Product
export async function updateProduct(req, res){
    if(!isAdmin(req)){
        res.status(403).json(
            {
                message: "Only Admin can update product"
            }
        )
        return;
    }

    try{
       await Product.updateOne({productId: req.params.productId},
        {
            name: req.body.name,
            altNames: req.body.altNames,
            price: req.body.price,
            labeledPrice: req.body.labeledPrice,
            description: req.body.description,
            images: req.body.images,
            brand: req.body.brand,
            model: req.body.model,
            category: req.body.category,
            isAvailable: req.body.isAvailable,
            stock: req.body.stock
        }
       )
       res.status(200).json(
        {
            message: "Product updated successfully"
        }
       )

    }catch(err){
        res.status(500).json(
            {
                message: "Error updating product",
                error: err.message
            }
        )
    }
}



export async function getProductById(req, res){
    try{
        const product = await Product.findOne({productId: req.params.productId});

        if(product == null){
            res.status(404).json(
                {
                    message: "Product not found"
                }
            )
            return;
        }
        if(product.isAvailable){
            res.status(200).json(
                {
                    message: "Product fetched successfully",
                    product: product
                }
            )
        }else{
            if(isAdmin(req)){
                res.status(200).json(
                    {
                        product: product
                    }
                )
            }else{
                res.status(403).json(
                    {
                        message: "Access Denied.. Admin can view only not available products"
                    }
                )
                return;
            }
        }
    }catch(err){
        res.status(500).json(
            {
                message: "Error fetching product",
                error: err.message
            }
        )
    }
}