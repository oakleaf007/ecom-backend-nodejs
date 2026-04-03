import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./src/routes/routes.js";

const  app = express();


app.use(express.json());
app.use(cors({
    origin: "*",
    methods:["GET","POST"],
    credentials: true
}));

app.get("/", (req, res)=>{
    res.json({status: "ok"})
});

app.use("/api/v1",router);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at: http://localhost:${process.env.PORT}`)
})
