import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inisialisasi state cartItems dengan data dari Local Storage
  // Jika tidak ada di Local Storage, gunakan array kosong
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCartItems = localStorage.getItem("cartItems");
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error("Gagal memuat item keranjang dari local storage:", error);
      return []; // Kembalikan array kosong jika ada error
    }
  });

  

  // Menambahkan item ke keranjang
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // Jika item sudah ada, tambahkan kuantitasnya
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        // Jika item baru, tambahkan dengan kuantitas 1 dan set 'selected' menjadi true secara default
        return [...prevItems, { ...item, quantity: 1, selected: true }];
      }
    });
  };

  // Menghapus item dari keranjang
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Menambah kuantitas item
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Mengurangi kuantitas item (minimal 1)
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Mengubah status 'selected' pada item
  const toggleItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  // Mengubah status 'selected' untuk semua item
  const toggleAll = () => {
    const allSelected = cartItems.every((item) => item.selected);
    setCartItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        selected: !allSelected,
      }))
    );
  };

  // Mengosongkan keranjang atau hanya item yang dipilih
  const clearCart = (onlySelected = false) => {
    if (onlySelected) {
      // Hapus hanya item yang statusnya 'selected'
      setCartItems((prevItems) => prevItems.filter((item) => !item.selected));
    } else {
      // Hapus semua item dari keranjang
      setCartItems([]);
    }
  };

  

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        toggleItem,
        toggleAll,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);