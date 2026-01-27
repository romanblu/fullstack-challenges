import { useState } from "react";

export default function ProductGallery({ images = [] }) {
  const [active, setActive] = useState(0);

  if (!images.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-center">
        No images
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <img
          src={images[active].url}
          alt={images[active].alt || "Product image"}
          className="w-full h-[420px] object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`border rounded-lg p-1 ${
              active === i ? "border-emerald-600" : "border-gray-300"
            }`}
          >
            <img
              src={img.url}
              alt={img.alt || "Thumbnail"}
              className="w-20 h-20 object-cover rounded"
            />
          </button>
        ))}
      </div>
    </div>
  );
}