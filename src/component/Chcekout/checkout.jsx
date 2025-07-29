import React, { useState, useEffect } from "react";
import { useCart } from "../Keranjang/cartContext";
import Navbar2 from "../HomePage/navbar2";
import Footer2 from "../HomePage/footer2";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { FaPercent } from "react-icons/fa";
// import { Layout } from "../../layout";

export default function CheckoutPage() {
  const [alamat, setAlamat] = useState("Jl.Contoh,RT07/RW05,Cimanggis,Depok");
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 
  const { cartItems, clearCart } = useCart();
  const [currentCheckoutItems, setCurrentCheckoutItems] = useState([]);



  useEffect(() => {
    if (location.state && location.state.directBuyProduct) {
      setCurrentCheckoutItems([location.state.directBuyProduct]);
    } else {
      setCurrentCheckoutItems(cartItems.filter((item) => item.selected));
    }
  }, [location.state, cartItems]); 

  const updateLocalQuantity = (id, newQuantity) => {
    setCurrentCheckoutItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, newQuantity) } 
          : item
      )
    );
  };

  const totalHarga = currentCheckoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleBeli = () => {
    setShowNotif(true);
    setTimeout(() => {
      if (!location.state || !location.state.directBuyProduct) {
        clearCart(true); // `true` berarti hanya menghapus item yang 'selected'
      }
      navigate("/home"); // Arahkan kembali ke beranda
    }, 2500);
  };

  return (
    <>
      <Navbar2/>

      <div className="min-h-screen bg-gray-800 text-black mt-14 -mb-16 p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {/* Alamat */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold underline text-gray-700 mb-2">Alamat Pengiriman</h2>
            <div className="flex items-center gap-2 mb-2">
              <span>📍</span>
              <p className="font-semibold">Rumah</p>
            </div>
            <textarea
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              rows={3}
              className="w-full bg-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Pesanan */}
          <div className="bg-white mb-18 rounded-lg shadow">
            <div className="border-b px-4 py-2 font-semibold">Pesanan</div>
            {currentCheckoutItems.length === 0 ? (
              <div className="p-4 text-gray-500">Tidak ada produk yang dipilih.</div>
            ) : (
              currentCheckoutItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex justify-between items-center border-b last:border-none"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        {/* Tombol +/- ini sekarang memengaruhi `currentCheckoutItems` lokal */}
                        <button
                          onClick={() => updateLocalQuantity(item.id, item.quantity - 1)}
                          className="px-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                          −
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateLocalQuantity(item.id, item.quantity + 1)}
                          className="px-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                          +
                        </button>
                      </p>
                    </div>
                  </div>
                  <p className="font-bold">
                    Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Ringkasan Belanja (Kanan) */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <h2 className="font-bold">Ringkasan belanja :</h2>

            {currentCheckoutItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <p>{item.title}</p>
                <p>Rp{(item.price * item.quantity).toLocaleString("id-ID")}</p>
              </div>
            ))}

            <hr />
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>Rp{totalHarga.toLocaleString("id-ID")}</p>
            </div>

            <div className="border rounded px-3 py-2 flex items-center gap-2 text-gray-700">
              <FaPercent className="text-xl" />
              <select className="bg-transparent w-full focus:outline-none">
                <option>Tidak ada voucher</option>
              </select>
            </div>
            <button
              className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-900"
              disabled={currentCheckoutItems.length === 0} // Nonaktifkan jika tidak ada item
              onClick={handleBeli}
            >
              Beli
            </button>
          </div>
        </div>
      </div>


      {showNotif && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-bounce">
          Pembelian berhasil! Mengarahkan ke beranda...
        </div>
      )}

      <Footer2/>
    </>
  );
}