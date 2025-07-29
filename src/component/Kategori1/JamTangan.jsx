import React, { useEffect, useState } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../Keranjang/cartContext";
import useFetch from "../../hooks/useFetch";
import Navbar2 from "../HomePage/navbar2";
import Footer2 from "../HomePage/footer2";

export default function JamTangan() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const { data, loading: loadingV2, error } = useFetch(
    "https://dummyjson.com/products?limit=0"
  );
  const { addToCart } = useCart();

  useEffect(() => {
    if (data?.products) {
      const filtered = data.products.filter(p =>
        ["mens-watches", "womens-watches"].includes(p.category)
      );
      setProducts(filtered);
    }
  }, [data]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (loadingV2) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading products!</p>;

  return (
    <>
      <Navbar2 />

      <div className="p-6">
        {toastMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
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

              <h2 className="text-2xl font-bold mb-4 mt-14">Produk Jam Tangan</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map(p => (
            <div
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              className="border rounded p-2 shadow hover:shadow-md cursor-pointer flex flex-col"
            >
              <img
                src={p.thumbnail}
                alt={p.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold text-sm">{p.title}</h3>
              <p className="text-xs">Rp {p.price.toLocaleString()}</p>
              <div className="flex justify-between mt-auto">
                <span className="text-xs text-yellow-500">⭐{p.rating}</span>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  onClick={e => {
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
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 px-4 z-50"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="bg-white p-6 rounded-lg w-full md:w-1/2 relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Tombol close */}
              <button
                className="absolute top-2 right-3 text-2xl text-gray-700 hover:text-black"
                onClick={() => setSelectedProduct(null)}
              >
                ×
              </button>

              <img
                src={selectedProduct.thumbnail}
                alt={selectedProduct.title}
                className="w-full h-64 object-contain mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{selectedProduct.title}</h2>
              <p className="text-gray-600 mb-2">{selectedProduct.description}</p>
              <p className="font-semibold">Rp {selectedProduct.price.toLocaleString()}</p>
              <p className="text-yellow-500 mb-3">⭐{selectedProduct.rating}</p>
              <div className="flex gap-3">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-2xl text-gray-800 hover:scale-125 transition cursor-pointer"
                  onClick={e => {
                    e.stopPropagation();
                    addToCart(selectedProduct);
                    setToastMessage("Produk ditambahkan ke keranjang!");
                  }}
                />
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm transition-transform duration-300 hover:scale-105"
                  onClick={() => {
                    addToCart({ ...selectedProduct, selected: true });

                    // Tambahkan delay kecil agar context sempat diupdate
                    setTimeout(() => {
                      navigate("/checkout");
                    }, 100); // 100ms delay cukup
                  }}
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

        <Footer2/>
    </>
  );
}
