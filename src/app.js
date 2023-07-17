require('dotenv').config()
import express from 'express';
const app = express();
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import DatabaseConnection from './middlewere/dbConnection'
import routes from './routes'
import { logger } from './middlewere/logger'
import corsOptions from './config/corsOptions';
import errorHandler from './middlewere/errorHandler';
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'

const port = 8000;

app.use(logger)

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', routes)

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    else if(req.accepts('json')) {
        res.json({ message: "404 Not Found."})
    }
    else {
        res.type('txt').send("404 Not Found.")
    }
})
DatabaseConnection

app.use(errorHandler)

app.listen(port, () => console.log("server is listening at port:"+ port));