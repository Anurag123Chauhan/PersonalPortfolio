import mongoose from "mongoose";

export async function connectDB() {
    try{
        await mongoose.connect("mongodb://localhost:27017");
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
    }
}

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

export const User = mongoose.model("User",userSchema);