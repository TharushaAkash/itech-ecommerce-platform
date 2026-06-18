import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, searchProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);

productRouter.get("/search", ()=>{
    console.log("Search API..")
})

productRouter.delete("/:productId", deleteProduct); //can use any name for :productId
    //: means there is a parameter in the url

productRouter.put("/:productId", updateProduct);
productRouter.get("/:productId", getProductById); //get single product details using productId

productRouter.get("/search/:query", searchProducts);



export default productRouter;

