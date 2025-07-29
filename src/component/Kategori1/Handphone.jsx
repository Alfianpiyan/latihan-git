import React, { useEffect, useState } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../Keranjang/cartContext";
import useFetch from "../../hooks/useFetch";
import Navbar2 from "../HomePage/navbar2";
import Footer2 from "../HomePage/footer2";
import { useNavigate } from "react-router-dom";

export default function Handphone() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    "https://dummyjson.com/products/category/smartphones?limit=12"
  );
  const product = data?.products ?? [];

  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (loading) return <p className="p-4 mt-20">Loading products...</p>;
  if (error)
    return (
      <p className="p-4 mt-20 text-red-500">
        Terjadi kesalahan saat memuat produk.
      </p>
    );

  return (
    <>
      <Navbar2 />

      {/* TOAST */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg relative">
            <button
              className="absolute top-1 right-2 text-white text-lg font-bold"
              onClick={() => setToastMessage("")}
            >
              ×
            </button>
            {toastMessage}
          </div>
        </div>
      )}

      <div className="pt-24 px-6 mb-16">
        <h2 className="text-2xl font-bold mb-4">Produk Handphone</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {product.map((p) => (
            <div
              key={p.id}
              className="flex flex-col justify-between text-left border rounded-lg p-2 shadow hover:shadow-md transition cursor-pointer h-full"
              onClick={() => setSelectedProduct(p)}
            >
              <img
                src={p.thumbnail}
                alt={p.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-semibold text-sm">{p.title}</h3>
              <p className="text-black text-xs">
                Rp {p.price.toLocaleString()}
              </p>

              <div className="flex items-center justify-between w-full mt-2">
                <p className="text-black text-xs flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  {p.rating} | {p.stock} terjual
                </p>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-gray-600 hover:text-gray-800 text-lg cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                    setToastMessage("Produk ditambahkan ke keranjang!");
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 z-50 -mt-16 bg-black bg-opacity-50 overflow-y-auto">
            <div
              className="flex justify-center items-start min-h-screen pt-20 px-4"
              onClick={() => setSelectedProduct(null)}
            >
              <div
                className="bg-white p-6 rounded-lg w-full md:w-1/2 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-3 text-xl font-bold text-gray-700"
                  onClick={() => setSelectedProduct(null)}
                >
                  ×
                </button>
                <img
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                  className="w-full h-64 object-contain mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">
                  {selectedProduct.title}
                </h2>
                <p className="text-gray-600 mb-2">
                  {selectedProduct.description}
                </p>
                <p className="text-gray-700 font-semibold mb-1">
                  Harga: Rp {selectedProduct.price.toLocaleString()}
                </p>
                <p className="text-yellow-500 mb-3">
                  ⭐ {selectedProduct.rating}
                </p>
                <div className="flex items-center gap-3">
                  <button className="text-gray-800">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="transition-transform duration-300 hover:scale-125 text-2xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(selectedProduct);
                        setToastMessage("Produk ditambahkan ke keranjang!");
                      }}
                    />
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm transition-transform duration-300 hover:scale-105"
                    onClick={() => {
                      addToCart({ ...selectedProduct, selected: true });
                      setTimeout(() => {
                        navigate("/checkout");
                      }, 100);
                    }}
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer2 />
    </>
  );
}
