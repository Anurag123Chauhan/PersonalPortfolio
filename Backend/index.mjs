import express from 'express';
import { User } from './src/mongoose/schema/user.mjs';
import bodyParser from "body-parser";
import { connectDB } from './src/mongoose/schema/user.mjs';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookiesMiddleware from './src/middleware/cookies_middleware.mjs';

dotenv.config();
const app = express();
app.use(cors({
    credentials: true,
    origin: "*"
}));
app.use(bodyParser.json());
app.use(cookieParser());


const PORT = process.env.PORT || 3000;
connectDB();


app.get("/",(req,res)=>{
    res.status(200).send("Hello World");
});

app.post("/register",async(req,res)=>{
    try{
        const { userName, password } = req.body;
        console.log("user: ", userName, "password: ", password);
        const existingUser = await User.findOne(
            {
                userName: userName
            }
        );
        if(existingUser) {
            res.status(400).send({msg:"User already exists!"});
        } else {
            const user = new User({userName,password});
            const token = jwt.sign({userName: userName,password: password},process.env.USER_SECRET_KEY);
            console.log(token);
            res.setHeader("Access-Control-Allow-Credentials",true);
            res.cookie("token",token,{
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                secure: false,
            });
            await user.save();
            res.status(201).send({msg:"User Created", token: token});
        }
    }catch(err){
        console.log(err);
        res.status(500).send({msg:"Internal Server Error"});
    }
});

app.post("/login",async(req,res)=>{
    try{
        console.log(req.body);
        const { userName, password } = req.body;
        
        const findUser = await User.findOne(
            {
                userName: userName
            }
        )
        if(findUser && findUser.password === password){
            const token = jwt.sign({userName: userName,password: password},process.env.USER_SECRET_KEY);
            res.setHeader("Access-Control-Allow-Credentials",true);
            res.cookie("token",token,{
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                secure: false,
            });
            console.log(jwt.verify(token,process.env.USER_SECRET_KEY));

            res.status(200).send({msg:"Login Successful", token: token});
        }
        else{
            res.status(404).send({msg:"User not found"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({msg:"Internal Server Error"});
    }
});

// app.get("/weather", cookiesMiddleware, weather);

app.post("/weather", cookiesMiddleware, async(req,res)=>{
    console.log(req);
    try{
        const { city } = req.body;
        console.log("city: ", city);
        const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
        const options = {
                method: 'GET',
                headers: {
                'X-RapidAPI-Key': '30b75c3bdbmsh10ab4b5aa3dbcd9p1583dcjsnd225eafef772',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        };
        const response = await fetch(url,options);
        console.log(response);
        res.status(200).send({msg:"Weather Data", result: await response.json()});
    }catch(err){
        console.log(err);
        res.status(500).send({msg:"Internal Server Error"});
    }
});

app.listen(PORT,()=>{
    console.log(`Listning to port ${PORT}`);
});