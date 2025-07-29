import { useNavigate } from "react-router-dom";
import { useCart } from "../Keranjang/cartContext";
import Navbar2 from "../HomePage/navbar2";
import { FaPercent, FaTrashAlt } from "react-icons/fa";

export default function Halaman() {
  const {
    cartItems,
    toggleItem,
    toggleAll,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const allSelected =
    cartItems.length > 0 && cartItems.every((item) => item.selected);
  const selectedItems = cartItems.filter((item) => item.selected);
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar2 />

      <div className="mt-14 bg-gray-800 text-black min-h-screen p-6 md:p-10 flex flex-col md:flex-row gap-6">
        {/* Kiri - Daftar Produk */}
        <div className="flex-1 space-y-4">
          {/* Header Pilih Semua */}
          <div className="bg-white rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="accent-green-500 w-5 h-5"
              />
              <span className="font-medium">Pilih Semua</span>
            </div>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700"
              disabled={cartItems.length === 0}
            >
              <FaTrashAlt />
            </button>
          </div>

          {/* Daftar Item */}
          {cartItems.length === 0 ? (
            <div className="bg-white p-6 rounded text-center text-gray-500">
              Keranjang kosong.
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-4 flex items-center gap-4"
              >
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleItem(item.id)}
                  className="accent-green-500 w-5 h-5"
                />
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex justify-between items-center w-full">
                  <div>
                    <span className="text-lg">{item.title}</span>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="font-bold">
                    Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Hapus"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Kanan - Ringkasan */}
        <div className="w-full md:w-80 bg-white rounded-lg p-6 space-y-4 shadow">
          <h2 className="font-bold text-lg">Ringkasan belanja</h2>

          {selectedItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.title}</span>
              <span>
                Rp{(item.price * item.quantity).toLocaleString("id-ID")}
              </span>
            </div>
          ))}

          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>Rp{total.toLocaleString("id-ID")}</span>
          </div>

          <div className="border rounded px-3 py-2 flex items-center gap-2 text-gray-700">
            <FaPercent className="text-xl" />
            <select className="bg-transparent w-full focus:outline-none">
              <option>Gunakan Voucher</option>
              <option>Tidak ada voucher</option>
            </select>
          </div>

          <button
            className="w-full bg-gray-600 text-white py-2 rounded-full hover:bg-gray-700 transition"
            disabled={total === 0}
            onClick={() => navigate("/checkout")}
          >
            Beli ({selectedItems.length})
          </button>
        </div>
      </div>
    </>
  );
}
