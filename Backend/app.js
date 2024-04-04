import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js"
import jobRouter from "./routes/jobRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
import fileUpload from "express-fileupload";

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET,PUT,POST,DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use('/api/v1/user',userRouter)
app.use('/api/v1/application',applicationRouter)
app.use('/api/v1/job',jobRouter)

export default app;