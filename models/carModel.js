// company: "Porsche",
//     modelName: "Panamera",
//     carImage: brand1,
//     price: "$138,599",
//     power: "Electric",
//     time: "3.7 sec",
//     speed: "356 km/h",
//     description: "The Porsche Panamera combines luxury and performance seamlessly, offering an all-electric powertrain with exhilarating acceleration and top-notch comfort for long drives.",
//     seats: 5,
//     transmission: "Automatic",
//     range: "500 km",
//     rating: 4.8,
//     weight: "2,045 kg",
//     dimensions: { length: "5,049 mm", width: "1,937 mm", height: "1,423 mm" },
//     batteryCapacity: "93.4 kWh",
//     torque: "850 Nm",
//     warranty: "8 years/160,000 km",

import mongoose from "mongoose";

const prochiSchema = new mongoose.Schema(
  {
    company: { type: String },
    modelName: { type: String },
    CarImage: { type: Array },
    price: { type: Number },
    power: { type: String },
    time: { type: String },
    speed: { type: String },
    description: { type: String },
    seats: { type: String },
    transmission: { type: String },
    range: { type: String },
    rating: { type: String },
    weight: { type: String },
    dimensions: { type: Array },
    // dimensions: { length: "5,049 mm", width: "1,937 mm", height: "1,423 mm" },
    batteryCapacity: { type: String },
    torque: { type: String },
    warranty: { type: String },
  },
  { timestamps: true }
);

const prochiModel =
  mongoose.models.CarModel || mongoose.model("CarModel", prochiSchema);
export default prochiModel;
