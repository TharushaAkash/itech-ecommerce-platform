import express from 'express';
import createOrder, { getOrders } from '../controllers/orderController.js';

const OrderRouter = express.Router();

OrderRouter.post("/", createOrder)
OrderRouter.get("/:pageSize/:pageNumber", getOrders)

export default OrderRouter;