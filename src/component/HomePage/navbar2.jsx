import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faSearch,
  faBars,
  faShoppingCart,
  faUser,
  faBell
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Navbar2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTouched, setSearchTouched] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);




  const navigate = useNavigate();

  useEffect(() => {
  if (searchTerm.trim() === "") {
    setSearchResults([]);
    setHasSearched(true); // ini penting agar pesan tetap muncul
    return;
  }

  const timer = setTimeout(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.products.filter((product) =>
          product.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setSearchResults(filtered);
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => {
        setLoading(false);
        setHasSearched(true); // hanya aktif setelah pencarian
      });
  }, 500);

  return () => clearTimeout(timer);
}, [searchTerm]);


  return (
    <>
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-700 fixed w-full z-50 top-0 border-b border-gray-300 dark:border-gray-600">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">
          <div
            className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer"
            onClick={() => navigate("/home")}
          >
            P-Store
          </div>

          {/* Search Bar */}
          <div className="flex-1 hidden md:flex justify-center">
            <div className="relative w-full max-w-md">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search..."
                className="ps-10 pe-8 p-2 w-full text-sm border bg-white rounded-lg focus:outline-none"
              />


              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 text-sm"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Icon Bar */}
          <div className="flex items-center space-x-5">
            <button className="text-gray-700 dark:text-white">
              <FontAwesomeIcon icon={faBell} className="text-2xl hover:scale-125 transition-transform" />
            </button>
            <button className="text-gray-700 dark:text-white" onClick={() => navigate("/keranjang")}>
              <FontAwesomeIcon icon={faShoppingCart} className="text-2xl hover:scale-125 transition-transform" />
            </button>
            <div className="w-[2px] h-6 bg-white rounded"></div>
            <button className="text-gray-700 dark:text-white"
             onClick={() => {
                          navigate("/profile");
                        }}
            >
              <FontAwesomeIcon icon={faUser} className="text-2xl hover:scale-125 transition-transform" />
            </button>
            <button
              className="md:hidden text-gray-700 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Search Results Box */}
    {(isSearchFocused || searchResults.length > 0 || loading) && (
  <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-white shadow-md z-40 rounded-lg max-w-xl w-full px-4 py-2">
    <h4 className="font-bold mb-2">Hasil Pencarian:</h4>

    {loading ? (
      <p className="text-gray-500">Memuat...</p>
    ) : searchTerm.trim() === "" && isSearchFocused ? (
      <p className="text-gray-500">Masukkan kata kunci pencarian</p>
    ) : searchResults.length > 0 ? (
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {searchResults.map((product) => (
          <li
            key={product.id}
            className="cursor-pointer border p-2 rounded hover:bg-gray-100"
            onClick={() => setSelectedProduct(product)}
          >
            {product.title}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">Produk tidak ditemukan</p>
    )}
  </div>
)}



      {/* Detail Produk Popup */}
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
                    <h2 className="text-2xl font-bold mb-2">{selectedProduct.title}</h2>
                    <p className="text-gray-600 mb-2">{selectedProduct.description}</p>
                    <p className="text-gray-700 font-semibold mb-1">
                      Harga: Rp {selectedProduct.price.toLocaleString()}
                    </p>
                    <p className="text-yellow-500 mb-3">⭐ {selectedProduct.rating}</p>
      
                    <div className="flex items-center gap-3">
                      <button className="text-gray-800">
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          className="transition-transform duration-300 hover:scale-125 text-2xl"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({ ...selectedProduct, selected: false });
                            setToastMessage("Produk ditambahkan ke keranjang!");
                          }}
                        />
                      </button>
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm transition-transform duration-300 hover:scale-105"
                        onClick={() => {
                          addToCart({ ...selectedProduct, selected: true });
                          navigate("/checkout");
                        }}
                      >
                        Beli Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
    </>
  );
}
