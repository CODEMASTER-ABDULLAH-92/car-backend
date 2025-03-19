import express from "express";
import "dotenv/config";  // No need for dotenv.config() since it's handled here
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import carRouter from "./routes/CarRouter.js";
import userRouter from "./routes/userRoutes.js";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({origin: "*",credentials:true}));
app.use(morgan("dev"));



connectDB();

// API Routing
app.get("/", (req, res) => {
    res.send("API Working");
});

app.use("/api/car",carRouter);
app.use("/api/user",userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (${process.env.PORT || "default 8000"})`));