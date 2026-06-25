import express from "express";
import createFeedBack, { deleteFeedBack, getAllFeedBacks, getPositiveFeedBacks, getFeedBacksByProduct } from "../controllers/feedBackController.js";

const feedBackRouter = express.Router();

feedBackRouter.post("/", createFeedBack);
feedBackRouter.get("/", getAllFeedBacks);
feedBackRouter.delete("/:orderId", deleteFeedBack);
feedBackRouter.get("/reviews", getPositiveFeedBacks);
feedBackRouter.get("/product/:productId", getFeedBacksByProduct);

export default feedBackRouter;