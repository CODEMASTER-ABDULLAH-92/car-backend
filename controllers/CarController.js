import prochiModel from "../models/carModel.js";



const addCar = async (req, res) => {
  try {
    const {
      company,
      modelName,
      price,
      power,
      CarImage,
      time,
      speed,
      description,
      seats,
      transmission,
      range,
      rating,
      weight,
      dimensions,
      batteryCapacity,
      torque,
      warranty,
    } = req.body;

    // Extract image URLs from uploaded files
    const carImages = req.files.map(file => file.path); // Get Cloudinary URLs

    const newCar = new prochiModel({
      company,
      modelName,
      price,
      power,
      time,
      speed,
      description,
      seats,
      transmission,
      range,
      rating,
      weight,
      dimensions,
      batteryCapacity,
      torque,
      warranty,
      CarImage:carImages,
    });

    await newCar.save();
    res.status(201).json({ success: true, message: "Car Added Successfully", car: newCar });
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ success: false, message: "Error adding car", error: error.message });
  }
};





const listCar = async (req,res) => {
    try {
        const car = await prochiModel.find({});
    res.json({success:true,message:"Lisitng",car});
} catch (error) {
    console.error("Err in List",error);
    res.json({success:false,message:"Err in Lisitng"});
    }
};

const updateCar = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        company,
        modelName,
        price,
        power,
        time,
        speed,
        description,
        seats,
        transmission,
        range,
        rating,
        weight,
        dimensions,
        batteryCapacity,
        torque,
        warranty,
      } = req.body;
  
      const carImages = req.files?.map((file) => file.path) || []; // Get Cloudinary URLs, ensure it doesn't break if no files uploaded
  
      // Update the car in the database
      const updatedCar = await prochiModel.findByIdAndUpdate(
        id,
        {
          company,
          modelName,
          price,
          power,
          time,
          speed,
          description,
          seats,
          transmission,
          range,
          rating,
          weight,
          dimensions,
          batteryCapacity,
          torque,
          warranty,
          ...(carImages.length > 0 && { CarImage: carImages }), // Only update images if provided
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedCar) {
        return res.status(404).json({ success: false, message: "Car not found" });
      }
  
      res.json({ success: true, message: "Car updated successfully", updatedCar });
    } catch (error) {
      console.error("Error in updating:", error);
      res.status(500).json({ success: false, message: "Error in updating" });
    }
  };
    
  
  
const removeCar = async (req,res) => {
  try {
    const {id} = req.params
   const car = await prochiModel.findByIdAndDelete(id)
    res.json({success:true,message:"Removed",car})

  } catch (error) {
console.error("Err in Removing",error);
    res.json({success:false,message:"Removing Err"})
  }
};

export { addCar, listCar, updateCar, removeCar };
