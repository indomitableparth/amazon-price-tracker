import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  url: String,
  imageUrl: String,
  desiredPrice: Number,
  currentPrice: Number,
  email: String,
  notified: { type: Boolean, default: false },
  lastChecked: Date,
  priceHistory: [  
    {
      price: Number,
      checkedAt: Date,
    }
  ],
  predictedDrop: { type: Boolean, default: false },
});

const Product = mongoose.model("Product", productSchema);

export default Product; 
