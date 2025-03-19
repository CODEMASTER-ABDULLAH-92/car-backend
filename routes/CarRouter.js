import express from 'express'
import { addCar,removeCar,updateCar,listCar } from '../controllers/CarController.js'
import upload from '../config/multer.js';
const carRouter = express.Router();

carRouter.post("/addCar", upload.array("carImage", 5),addCar);
carRouter.get("/listCar",listCar);
carRouter.put("/updateCar/:id",updateCar);
carRouter.delete("/removeCar/:id",removeCar);

export default carRouter;


