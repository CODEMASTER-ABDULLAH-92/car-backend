import express from "express";
import "dotenv/config";
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
app.use(morgan("dev"));


const allowedOrigins = ["http://localhost:5173", "https://car-new-back.vercel.app"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));




connectDB();

// API Routing
app.get("/", (req, res) => {
    res.send("API Working");
});

app.use("/api/car",carRouter);
app.use("/api/user",userRouter);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (${process.env.PORT || "default 8000"})`));