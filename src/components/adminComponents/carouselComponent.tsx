'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type CarouselImage = {
  id: string;
  url: string;
  title: string;
  description: string;
};

export default function CarouselAdminPage() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<CarouselImage>>({});
  const [newImage, setNewImage] = useState({
    url: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await axios.get('/api/carousel');
    setImages(res.data);
    setEditIndex(null);
    setEditData({});
  };

  const handleAdd = async () => {
    if (!newImage.url.trim()) return;
    await axios.post('/api/carousel', newImage);
    setNewImage({ url: '', title: '', description: '' });
    fetchImages();
  };

  const handleUpdate = async (id: string) => {
    await axios.put(`/api/carousel/${id}`, editData);
    fetchImages();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/carousel/${id}`);
    fetchImages();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Carousel Admin Panel</h1>

      {/* Add New Image */}
      <div className="space-y-3 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold">Add New Slide</h2>
        <input
          type="text"
          placeholder="Image URL"
          value={newImage.url}
          onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Title"
          value={newImage.title}
          onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={newImage.description}
          onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Slide
        </button>
      </div>

      {/* List Images */}
      <div className="space-y-6">
        {images.map((img, index) => (
          <div key={img.id} className="border p-4 rounded-lg shadow-sm space-y-2">
            <div className="flex items-center gap-4">
              <img src={img.url} alt={img.title} className="w-24 h-16 object-cover rounded" />

              {editIndex === index ? (
                <input
                  type="text"
                  value={editData.url ?? img.url}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, url: e.target.value }))
                  }
                  className="flex-1 border p-1 rounded"
                />
              ) : (
                <p className="flex-1">{img.url}</p>
              )}
            </div>

            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editData.title ?? img.title}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full border p-1 rounded"
                />
                <textarea
                  value={editData.description ?? img.description}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full border p-1 rounded"
                />
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{img.title}</h3>
                <p className="text-sm text-gray-600">{img.description}</p>
              </>
            )}

            <div className="flex justify-end gap-4 mt-2">
              {editIndex === index ? (
                <>
                  <button
                    onClick={() => handleUpdate(img.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditIndex(null);
                      setEditData({});
                    }}
                    className="text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setEditData({
                        url: img.url,
                        title: img.title,
                        description: img.description,
                      });
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
