import "dotenv/config";

import pool from "./config/db.js";
// console.log(process.env.DB_URL);
async function testDb(){
    const result = await pool.query("select now()");
    console.log(result.rows);
}
testDb();