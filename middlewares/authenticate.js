import jwt from "jsonwebtoken";


export default function authenticateUser(req, res, next){
    const header = req.header("Authorization");
    
            if(header != null){
                const token = header.replace("Bearer ", "");

                jwt.verify(token, process.env.JWT_SECRET_KEY,
                    (error, decoded)=>{
                        console.log(decoded)
    
                        if(decoded == null){
                            res.json(
                                {
                                    message: "Invalid Token, Log again..."
                                }
                            )
                            console.log(error.message);
                        }else{
                            req.user = decoded;
                            next();
                        }
                    }
                )
            }else{
                next();
            }
}