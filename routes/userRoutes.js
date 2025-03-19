import express from 'express'
import { LoginUser,LogoutUser,RegisterUser, singleUser } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post("/login",LoginUser);
userRouter.post("/logout",LogoutUser);
userRouter.post("/register",RegisterUser);
userRouter.post("/fetchUser",singleUser);

export default userRouter;