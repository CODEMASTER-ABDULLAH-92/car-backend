import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


const createAccessToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"15m"});
}

const createRefreshToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"7d"});
}

const LoginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user (use findOne instead of find)
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "User doesn't exist" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid password or email" });
      }
  
      // Generate tokens
      const accessToken = createAccessToken(user._id);
      const refreshToken = createRefreshToken(user._id);
  
      // Store refreshToken in HTTP-only cookies
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
  
      // Store accessToken in HTTP-only cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });
  
      // Send response (no accessToken in JSON, it's in the cookie)
      res.json({ success: true, message: "Logged in", accessToken });
  
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
  

const LogoutUser = async (req,res) => {
  try {

    res.clearCookie("accessToken");
    return res.status(200).json({ success: true, message: "Logged out successfully"});
  } catch (error) {
    res.json({success:false,message:"Err in Loge Out"})
    console.error("Error In Loge out");
  }
}

const RegisterUser = async (req, res) => {
    try {
      const { password, email, name } = req.body;
  
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }
  
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" });
      }
  
      if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
      }
  
      const isUserExist = await userModel.findOne({ email });
      if (isUserExist) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create user
      const user = new userModel({ name, email, password: hashedPassword });
      await user.save();
  
      // Generate tokens
      const accessToken = createAccessToken(user._id);
      const refreshToken = createRefreshToken(user._id);
  
      // Store refreshToken in HTTP-only cookies
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
  
      // Store accessToken in HTTP-only cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });
  
      return res.status(201).json({ success: true, message: "User registered successfully" });
  
    } catch (error) {
      console.error("Error in register:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
const singleUser = async (req, res)=>{
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Token expired or invalid" });
            }
            return decoded;
        });
        const user = await userModel.findById(decoded.id).select("name email");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
      return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export {LoginUser,LogoutUser,RegisterUser,singleUser}