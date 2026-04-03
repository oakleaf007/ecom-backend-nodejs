import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signUp = async(req, res)=>{
    try{
        const {name, password, token} = req.body;


        if(!password || !token){
            return res.status(400).json({message: "no password or token recieved"})

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.verifiedEmail;

        const existingUser = await pool.query("select * from users where email =$1", 
                [email]
        );

        if(existingUser.rows.length>0){
            return res.status(400).json({message : "user already exist"});
        }

        const salty = 10;
        const hashedPass = await bcrypt.hash(password, salty);

        const result = await pool.query(
            "Insert into users(name, email, password) values ($1, $2,$3) ",
            [name, email.toLowerCase(), hashedPass]
        );
        res.status(201).json({message: "user created successfully"});

    }catch(error){
        console.error(error);
        res.status(500).json({error: "error.message"})
    }
}

export const signIn = async(req, res)=>{
    try{
        const { email, password} = req.body;

        const existingUser = await pool.query("select * from users where email =$1", [email.toLowerCase()]);
        if(existingUser.rows.length===0){
            return res.status(404).json({message: "user not found"});
        }

        const user = existingUser.rows[0];
       
        const comparePass= await bcrypt.compare(password, user.password);
        if(!comparePass){
            return res.status(401).json({message: "invalid credential"});
        }


        const token = jwt.sign(
            {id: user.id,
            role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}

            
        )
        res.status(200).json({message: "Login successful", token});


    }catch(error){
        console.error(error);
        res.status(500).jsson({message: "server error"})
    }
}

