import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./database/dbConnection.js";

dotenv.config({
    path: './.env'
})

connectDB()

app.get('/',(req,res) => {
    res.send("Hello Sandeep")
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})