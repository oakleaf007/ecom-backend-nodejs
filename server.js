import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/routes.js";

const  app = express();


app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Server is running");
});

app.use("/api",router);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at: http://localhost:${process.env.PORT}`)
})
