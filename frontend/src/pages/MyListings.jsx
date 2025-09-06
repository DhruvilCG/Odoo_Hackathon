import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MyListings() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: 0,
    quantity: 1,
    condition: "",
    yearOfManufacture: "",
    brand: "",
    model: "",
    dimensions: { length: 0, width: 0, height: 0 },
    weight: 0,
    material: "",
    color: "",
    originalPackaging: false,
    manualIncluded: false,
    workingCondition: "",
  });

  // Fetch user listings
  useEffect(() => {
    const fetchListings = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `https://odoo-hackathon-psi.vercel.app/api/products?user=${user.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch listings");
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error("Failed to fetch listings", err.message);
        setErr(err.message);
      }
    };
    fetchListings();
  }, [user]);

  // Delete product
  const del = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://odoo-hackathon-psi.vercel.app/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to delete product");
      setListings(listings.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Delete error", err.message);
    }
  };

  // Add product
  const addProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://odoo-hackathon-psi.vercel.app/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add product");
      const data = await res.json();
      setListings([data, ...listings]);
      // Reset form to empty after adding
      setForm({
        title: "",
        category: "",
        description: "",
        price: 0,
        quantity: 1,
        condition: "",
        yearOfManufacture: "",
        brand: "",
        model: "",
        dimensions: { length: 0, width: 0, height: 0 },
        weight: 0,
        material: "",
        color: "",
        originalPackaging: false,
        manualIncluded: false,
        workingCondition: "",
      });
      alert("Product added successfully!");
    } catch (err) {
      console.error("Add product error", err.message);
      setErr(err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 font-sans">
      <section className="bg-gradient-to-b from-purple-900 to-purple-700 text-white p-6 sm:p-12 flex justify-center items-center">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl text-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">My Listings</h2>
          </div>

          {err && <div className="text-red-600 mb-4 text-center">{err}</div>}

          {/* Add Product Form */}
          <div className="mb-6 p-4 border rounded bg-gray-50 space-y-2 text-gray-800">
            <h3 className="font-semibold mb-2 text-gray-900">Add New Product</h3>
            {Object.keys(form).map((key) => {
              if (typeof form[key] === "object" && form[key] !== null) {
                return Object.keys(form[key]).map((subKey) => (
                  <input
                    key={subKey}
                    type="number"
                    className="border p-2 w-full text-gray-800 placeholder-gray-500"
                    placeholder={subKey}
                    value={form[key][subKey]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [key]: { ...form[key], [subKey]: Number(e.target.value) },
                      })
                    }
                  />
                ));
              }
              if (typeof form[key] === "boolean") {
                return (
                  <label key={key} className="flex items-center gap-2 text-gray-800">
                    <input
                      type="checkbox"
                      checked={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                    />
                    {key}
                  </label>
                );
              }
              if (typeof form[key] === "number") {
                return (
                  <input
                    key={key}
                    type="number"
                    className="border p-2 w-full text-gray-800 placeholder-gray-500"
                    placeholder={key}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}
                  />
                );
              }
              return (
                <input
                  key={key}
                  type="text"
                  className="border p-2 w-full text-gray-800 placeholder-gray-500"
                  placeholder={key}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              );
            })}
            <button
              onClick={addProduct}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mt-2"
            >
              Add Product
            </button>
          </div>

          <div className="space-y-4">
            {listings.length === 0 ? (
              <div className="p-4 sm:p-6 bg-white rounded shadow text-center text-gray-800">No listings yet</div>
            ) : (
              listings.map((p) => (
                <div
                  key={p._id}
                  className="bg-white p-2 sm:p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-center hover:shadow-lg transition text-gray-800"
                >
                  <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 flex items-center justify-center rounded text-gray-800">
                      Img
                    </div>
                    <div>
                      <div className="font-semibold text-base sm:text-lg">{p.title}</div>
                      <div className="text-purple-600 font-bold mt-1 text-sm sm:text-base">₹{p.price}</div>
                      <div className="text-sm sm:text-base text-gray-700">{p.description}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <Link
                      to={`/product/${p._id}`}
                      className="px-2 sm:px-3 py-1 border rounded-lg hover:bg-gray-100 transition text-sm sm:text-base text-gray-800"
                    >
                      View
                    </Link>
                    <Link
                      to={`/add-product?id=${p._id}`}
                      className="px-2 sm:px-3 py-1 border rounded-lg hover:bg-gray-100 transition text-sm sm:text-base text-gray-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => del(p._id)}
                      className="px-2 sm:px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
