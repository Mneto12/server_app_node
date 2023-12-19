import express, { Application } from "express";
import dotenv from 'dotenv'
import { router } from "./Routes";
import cors from 'cors'

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(router);
app.listen(port, () => {
    console.log('Server Running in port:' ,port)
})