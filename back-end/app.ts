import express from 'express';
import fileUpload from "express-fileupload";
import {AppDataSource} from "./src/data-source";
import AuthRouter from "./src/routers/auth.router";
import cors from 'cors'
import EventRouter from "./src/routers/event.router";
import UserRouter from './src/routers/user.router';
require('dotenv').config();

const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    socket.on('send_invitation', (data) => {
        socket.broadcast.emit('receive_invitation', data)
    })
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

app.use(
    fileUpload({
        createParentPath: true,
    })
);
app.use(express.json());
app.use(cors());
app.use("/api/auth", AuthRouter);
app.use("/api/events", EventRouter);
app.use("/api/users", UserRouter);

server.listen(process.env.APP_PORT, () => {
    console.log("App running on port: " + process.env.APP_PORT)
})
