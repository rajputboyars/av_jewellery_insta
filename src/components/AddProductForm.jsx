"use client";

import { useState } from "react";

const categories = [
  "All Products",
  "Bracelet",
  "Chain",
  "Earring",
  "Hair Accessory",
  "Gift Hamper",
];

export default function AddProductForm({ handleSubmit }) {
  const [imagePreviews, setImagePreviews] = useState([]);

const onsubmit=(formData)=>{
  handleSubmit(formData)
  window.location.href = '/admin/products';

}
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <form
      action={onsubmit}
      className="bg-white p-6 rounded shadow-md max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 border border-amber-500"
    >
      {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full mb-4 p-2 border rounded"
        required
        // disabled={isLoading}
      />

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Category</label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2"
                required
                // disabled={isLoading}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <input
        type="number"
        name="price"
        placeholder="Price"
        className="w-full mb-4 p-2 border rounded"
        required
        // disabled={isLoading}
      />
      <input
        type="number"
        name="discount"
        placeholder="Discount (optional)"
        className="w-full mb-4 p-2 border rounded"
        // disabled={isLoading}
      />
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Images</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          className="w-full mb-2"
          onChange={handleImageChange}
        //   disabled={isLoading}
        />
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mt-2">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-10 h-10 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>
      <textarea
        name="description"
        placeholder="Description"
        className="w-full mb-4 p-2 border rounded"
        // disabled={isLoading}
      />
      <button
        type="submit"
        className={`w-full p-2 rounded text-white bg-amber-500 hover:bg-amber-600 cursor-pointer`}
        // disabled={isLoading}
      >
        Add Product
      </button>
    </form>
  );
}
