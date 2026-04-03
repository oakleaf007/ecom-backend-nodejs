import pool from "../config/db.js";
const query= `select p.id,
                p.name,
                p.price,
                p.description,
                p.stock,
                c.name as category,
                ARRAY_AGG(pi.image_url) AS images
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                LEFT JOIN product_images pi ON pi.product_id = p.id
                where p.id=$1
                GROUP BY 
                    p.id, p.name, p.price, p.description,p.stock, c.name
                ORDER BY p.id
                `;

export const loadSingleProduct = async(req,res)=>{


    const {id} = req.params;

    try{
        const result = await pool.query(query,[id]);
        if(result.rows.length===0){
            return result.status(404).json({success: false, message: "no product found"})

        }
        res.json(result.rows[0]);
    }catch(err){
        console.error(err);
        res.status(500).json({message: "server error"})
    }

};
