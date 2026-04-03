import pool from "../config/db.js";


const query= `select p.id,
                p.name,
                p.price,
                p.description,
                p.stock,
                c.name as category,
                pi.image_url
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                LEFT JOIN product_images pi ON pi.product_id = p.id
                ORDER BY p.id
                Limit $1 OFFSET $2
                `;
export const loadProducts = async(req,res)=>{
    

    try{
        
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

    
        const {rows} = await pool.query(query, [limit, offset]);

        if(rows.length === 0) return res.status(404).json({success:false, message: "no product available"});
        res.status(200).json({
            success:true, data:rows
        });
   
    }catch(error){
            res.status(500).json({message: error.message})
    }

}