import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Page/LandingPage";
import HomePage from "./Page/HomePage";
import Keranjang from "./Page/Keranjang";
import { CartProvider } from "./component/Keranjang/cartContext";
import Handphone from "./component/Kategori1/Handphone";
import JamTangan from "./component/Kategori1/JamTangan";
import Pakaian from "./component/Kategori1/Pakaian";
import Checkout from "./Page/Checkout";
import Profile from "./Page/ProfilePage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/kategori/hp" element={<Handphone />} />
          <Route path="/kategori/jam" element={<JamTangan />} />
          <Route path="/kategori/pakaian" element={<Pakaian />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
