import FoodModel from "../models/foodModel.js";

export const addFood = async (req, res) => {
  try {
    console.log("✅ [addFood] API called");
    console.log("Body =>", req.body);
    console.log("File =>", req.file);

    if (!req.file) {
      console.log("❌ No image uploaded!");
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const food = new FoodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename, // Save filename, not path
    });

    await food.save();

    console.log("✅ Food saved:", food);

    res.json({ success: true, message: "Food added successfully" });
  } catch (err) {
    console.error("❌ Error in addFood:", err.message);
    res.status(500).json({ success: false, message: "Failed to add food" });
  }
};
