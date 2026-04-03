import jwt from "jsonwebtoken";


export function authMiddleware(req, res, next){

    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                message: "no token provided"
            });
        }

        const token = authHeader.split(" ")[1];
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        req.user = decoded;
        next();

    }catch(error){
        return res.status(401).json({message: "invalid or expired token"})
    }


}