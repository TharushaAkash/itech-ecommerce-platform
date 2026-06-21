import FeedBack from "../models/feedBack.js";


export default async function createFeedBack(req, res){
    try{
        if(req.user == null){
            console.log("No user")
            res.status(401).json(
                {
                    message: "You need to login"
                }
            )
            return;
        }

        const newFeedBack = new FeedBack(
            {
                name: req.body.name,
                email: req.body.email,
                orderId: req.body.orderId,
                rating: req.body.rating,
                image: req.user.image,
                subject: req.body.subject,
                message: req.body.message,
                pictures: req.body.pictures
            }
        )

        await newFeedBack.save();
        console.log("feddback created")
        res.status(200).json(
            {
                message: "Feedback Submitted Successfully."
            }
        )
    }catch(err){
        console.log(err.message)
        res.status(500).json(
            {
                message:"Error"
            }
        )
    }
}


// get all feedbacks (Admin)
export async function getAllFeedBacks(req, res){

    try{
        if(req.user == null || !req.user.isAdmin){
            console.log("User Need be a admin")
            res.status(401).json({
                message: "Unauthorize.. This action can be done by admins only.."
            })
            return;
        }

        const feedBacks = await FeedBack.find();
        res.status(201).json({
            message: "Feedbacks retriew succesfully",
            feedBacks: feedBacks
        })

    }catch(err){
        res.status(500).json({
            message: "There is a problem on retriewing feedbacks"
        })
    }
}

// Get positive feedbacks for landingPage
export async function getPositiveFeedBacks(req, res){

    try{
        const feedBacks = await FeedBack.find({rating: {$gte:3}});
        res.status(201).json({
            message: "Feedbacks retriew succesfully",
            feedBacks: feedBacks
        })

    }catch(err){
        res.status(500).json({
            message: "There is a problem on retriewing feedbacks"
        })
    }
}
// Delete Feedback
export async function deleteFeedBack(req, res){
    const orderId = req.params.orderId;
    try{
        const response = await FeedBack.deleteOne({orderId: orderId});
        if(orderId == null){
            res.status(404).json({
                message: "Order not found"
            })
            return;
        }

        res.status(201).json({
            message: "Feedback Deleted Successfully."
        })
        

    }catch(err){
        res.status(500).json({
            message: "Error deleting the review"
        })
    }
}