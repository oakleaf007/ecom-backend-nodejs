
import pool from "../config/db.js";

export const profile= async(req, res)=>{
    try{
   const userId = req.user.id;

    const result = await pool.query("select name, email from users where id = $1", [userId]);
    

      if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = result.rows[0];
    
    
    res.status(200).json({name: user.name, email:user.email});


    }catch(error){
        res.status(500).json({mesage: error.message})
    }
    
}