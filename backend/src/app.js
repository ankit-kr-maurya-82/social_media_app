import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import

import userRouter from "./routes/user.routes.js"


// routes declaration
app.get('/', (req, res)=> {
    res.send("Social Media App")
    res.send("Home Page")
})
app.use("/api/v1/users", userRouter)


export  { app }