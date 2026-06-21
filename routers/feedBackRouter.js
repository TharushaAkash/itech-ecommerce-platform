import express from "express";
import createFeedBack, { deleteFeedBack, getAllFeedBacks, getPositiveFeedBacks } from "../controllers/feedBackController.js";

const feedBackRouter = express.Router();

feedBackRouter.post("/", createFeedBack);
feedBackRouter.get("/", getAllFeedBacks);
feedBackRouter.delete("/:orderId", deleteFeedBack);
feedBackRouter.get("/reviews", getPositiveFeedBacks);

export default feedBackRouter;