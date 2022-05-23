import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import requestLogger from './middeleware/requestlogger.js'
import { connect } from "./lib/database.js"
import userRouter from './routes/userRouter.js'
import messageRouter from './routes/messageRouter.js'
import checkAuth from "./middeleware/checkAuth.js"

dotenv.config()
connect()
const app = express()
app.use(cors())
app.use(requestLogger)
app.use(express.json())

// endpoints

app.use("/api/v1/users", userRouter)
app.use("/api/v1/messages", checkAuth, messageRouter)

app.use((req, res, next)=> next({ status: 404, message: "Resource not found"}))


// Assume err an object like { status, message, originalError }
app.use((err, req, res, next) => {
    console.log("GE ", err)
    res.status(err.status || 500).send({errors: err.message || "Something went wrong" })
})


// start

app.listen(process.env.PORT || 3000, () => {console.log("Listening port", process.env.PORT)})