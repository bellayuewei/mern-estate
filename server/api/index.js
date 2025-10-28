import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from "./routes/auth.route.js"
import cookieParser from 'cookie-parser'

dotenv.config() // 1) 加载 .env，把 MONGO 等环境变量塞进 process.env

mongoose.connect(process.env.MONGO).then(()=>{ // 2) 连接 MongoDB
    console.log('Connect to MongoDB!');}).catch((err)=>{
    console.log(err);
});

const app = express() 

app.use(express.json()); // 解析 application/json
app.use(cookieParser())

app.listen(4000, ()=> { // 3) 启动服务器：监听 4000 端口
    console.log('Server is running on port 4000!');
})

app.use('/api/user',userRouter) // 4) 把 /api/user/* 的请求交给 user 路由
app.use('/api/auth',authRouter) // 5) 把 /api/auth/* 的请求交给 auth 路由

app.use((err, req, res, next) => {
    const statusCode = err.statusCode||500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


