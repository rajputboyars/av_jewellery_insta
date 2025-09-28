import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  images: [{ type: String }], // Array for multiple images; can be single or empty
  description: { type: String },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);