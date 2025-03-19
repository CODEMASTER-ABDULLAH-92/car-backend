import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("DataBase Connected");
    } catch (error) {
        console.error("DataBase Error", error);
    }
}
export default connectDB;