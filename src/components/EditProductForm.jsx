'use client';

import { useState } from 'react';
import axios from 'axios';

export default function EditProductForm({ handleSubmit, product }) {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [newFiles, setNewFiles] = useState([]); // <-- keep actual files
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles(files); // store files for upload
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // ⬇️ Cloudinary upload function (client-side)
  const uploadImagesToCloudinary = async (files) => {
    const uploadedUrls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      uploadedUrls.push(res.data.secure_url);
    }
    return uploadedUrls;
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Upload new files (if any)
      const newImageUrls = newFiles.length > 0
        ? await uploadImagesToCloudinary(newFiles)
        : [];

      // Collect existing images
      const existingImages = JSON.parse(formData.get('existingImages') || '[]');

      // Combine
      const allImages = [...existingImages, ...newImageUrls];

      // Build clean payload
      const payload = {
        name: formData.get('name'),
        category: formData.get('category'),
        price: Number(formData.get('price')),
        discount: Number(formData.get('discount')) || undefined,
        description: formData.get('description'),
        images: allImages,
      };

      const result = await handleSubmit(payload);

      if (result.success) {
        window.location.href = '/admin/products';
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <form action={onSubmit} className="bg-white p-6 rounded shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="text"
        name="name"
        defaultValue={product.name}
        placeholder="Name"
        className="w-full mb-4 p-2 border rounded"
        required
        disabled={isLoading}
      />
      <input
        type="text"
        name="category"
        defaultValue={product.category}
        placeholder="Category"
        className="w-full mb-4 p-2 border rounded"
        required
        disabled={isLoading}
      />
      <input
        type="number"
        name="price"
        defaultValue={product.price}
        placeholder="Price"
        className="w-full mb-4 p-2 border rounded"
        required
        disabled={isLoading}
      />
      <input
        type="number"
        name="discount"
        defaultValue={product.discount}
        placeholder="Discount (optional)"
        className="w-full mb-4 p-2 border rounded"
        disabled={isLoading}
      />

      <div className="mb-4">
        <label className="block mb-2">Existing Images</label>
        <input
          type="hidden"
          name="existingImages"
          value={JSON.stringify(product.images || [])}
        />
        <div className="flex flex-wrap gap-2">
          {product.images?.map((img, index) => (
            <img key={index} src={img} alt={`Existing ${index}`} className="w-24 h-24 object-cover" />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Add New Images</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          className="w-full mb-2"
          onChange={handleImageChange}
          disabled={isLoading}
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
        defaultValue={product.description}
        placeholder="Description"
        className="w-full mb-4 p-2 border rounded"
        disabled={isLoading}
      />

      <button
        type="submit"
        className={`w-full h-fit p-2 rounded text-white ${
          isLoading ? 'bg-amber-300 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600'
        }`}
        disabled={isLoading}
      >
        {isLoading ? 'Updating Product...' : 'Update Product'}
      </button>
    </form>
  );
}
