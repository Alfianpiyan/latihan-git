import { useState } from "react";
import {
  faSearch,
  faBars,
  faShoppingCart,
  faXmark,
  faEnvelope,
  faLock,
  faUser,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // pastikan path benar
import ToogleLanguages from "../global/toggle-languages";

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const success = login(email, password);
    if (success) {
      setIsLoginOpen(false);
      navigate("/home", { state: { success: "Login berhasil" } });
    }
  };

const handleRegister = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const phone = e.target.phone.value;
  const password = e.target.password.value;

  const success = register({ name, email, phone, password }); // << JANGAN LUPA INI

  if (!success) {
    alert("Gmail sudah terdaftar");
    return;
  }

  setIsRegisterOpen(false);
  navigate("/home", { state: { success: "Register berhasil" } });
};

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-700 fixed w-full z-30 top-0 border-b border-gray-300 dark:border-gray-600">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 px-7">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">P-Store</span>

          <div className="hidden md:flex text-lg space-x-20">
            <a href="#home" className="hover:underline text-gray-800 dark:text-white">Home</a>
            <a href="#product" className="hover:underline text-gray-800 dark:text-white">Product</a>
            <a href="#contact" className="hover:underline text-gray-800 dark:text-white">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                className="ps-10 p-2 text-sm border bg-white rounded-lg focus:outline-none"
                placeholder="Search..."
              />
            </div>

            <button className="text-gray-800 dark:text-white">
              <FontAwesomeIcon icon={faShoppingCart} className="transition-transform duration-300 hover:scale-125 text-2xl" />
            </button>

            <button
              onClick={() => setIsLoginOpen(true)}
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-600 hover:text-white text-sm transition-transform duration-300 hover:scale-105"
            >
              Masuk
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 dark:text-white"
            >
              <FontAwesomeIcon icon={faBars} className="transition-transform duration-300 hover:scale-125 text-2xl" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <input type="text" placeholder="Search..." className="w-full p-2 border rounded mb-2" />
            <ul className="space-y-2">
              <li><a href="#home" className="block py-2 px-3">Home</a></li>
              <li><a href="#product" className="block py-2 px-3">Product</a></li>
              <li><a href="#contact" className="block py-2 px-3">Contact</a></li>
            </ul>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Masuk ke akun Anda</h3>
              <button onClick={() => setIsLoginOpen(false)}>
                <FontAwesomeIcon icon={faXmark} className="text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="email" type="email" className="w-full p-2 ps-10 border rounded" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="password" type="password" className="w-full p-2 ps-10 border rounded" placeholder="••••••••" required />
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Belum punya akun?{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                  }}
                >
                  Daftar
                </button>
              </div>
              <button type="submit" className="w-full bg-gray-600 hover:bg-gray-400 transition-all text-white p-2 rounded">
                Masuk
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Daftar</h3>
              <button onClick={() => setIsRegisterOpen(false)}>
                <FontAwesomeIcon icon={faXmark} className="text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nama</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="name" type="text" className="w-full p-2 ps-10 border rounded" placeholder="Nama lengkap" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="email" type="email" className="w-full p-2 ps-10 border rounded" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">No. HP</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="phone" type="tel" className="w-full p-2 ps-10 border rounded" placeholder="08xxxxxxxxxx" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="password" type="password" className="w-full p-2 ps-10 border rounded" placeholder="••••••••" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-gray-600 hover:bg-gray-500 transition-all text-white p-2 rounded">
                Buat Akun
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
