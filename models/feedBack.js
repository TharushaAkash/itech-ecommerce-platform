import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: "images/default.png"
        },

        rating: {
            type: Number
        },

        orderId: {
            type: String,
            required: true
        },

        subject: {
            type: String,

        },

        message: {
            type: String,
            required: true
        },
        
        pictures: {
            type: [String],

        },

        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        },

    }
)

const FeedBack = mongoose.model("FeedBack", feedBackSchema);
export default FeedBack;