import express from 'express';
import createOrder, { getOrders, updateStatusAndNotes } from '../controllers/orderController.js';

const OrderRouter = express.Router();

OrderRouter.post("/", createOrder)
OrderRouter.get("/:pageSize/:pageNumber", getOrders)
OrderRouter.put("/:orderId", updateStatusAndNotes)
export default OrderRouter;