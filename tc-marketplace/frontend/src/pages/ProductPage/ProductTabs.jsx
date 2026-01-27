import { useState } from "react";

export function ProductTabs({ product }) {
  const [tab, setTab] = useState("desc");

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-10">
      <div className="flex gap-6 border-b mb-4">
        {["desc", "specs", "reviews"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 ${
              tab === t ? "border-b-2 border-blue-600 font-medium" : ""
            }`}
          >
            {t === "desc" && "Description"}
            {t === "specs" && "Specifications"}
            {t === "reviews" && "Reviews"}
          </button>
        ))}
      </div>

      {tab === "desc" && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      )}

      {tab === "specs" && (
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="font-medium py-2">Category</td>
              <td>{product.productType}</td>
            </tr>
            <tr>
              <td className="font-medium py-2">Species</td>
              <td>{product.species}</td>
            </tr>
            <tr>
              <td className="font-medium py-2">Seller</td>
              <td>{product.store?.name}</td>
            </tr>
          </tbody>
        </table>
      )}

      {tab === "reviews" && (
        <p className="text-gray-500">No reviews yet</p>
      )}
    </div>
  );
}