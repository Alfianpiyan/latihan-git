import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEnvelope, faLock, faUser, faPhone } from "@fortawesome/free-solid-svg-icons";
import gbrTamu from "../../assets/ruangTamu.jpg";
import useAuth from "../../hooks/useAuth";

export default function Section4() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { register, login } = useAuth();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", phone: "", password: "" });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginData.email, loginData.password);
    setIsLoginOpen(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register(registerData);
    setIsRegisterOpen(false);
  };

  return (
    <>
      <section
        className="relative bg-cover bg-center w-full h-auto py-20 text-white text-center"
        style={{ backgroundImage: `url(${gbrTamu})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-10">
            Buat akun Anda dan nikmati pengalaman <br /> belanja furnitur yang praktis, cepat, <br /> dan penuh pilihan menarik!!
          </h2>
          <button
            onClick={() => setIsLoginOpen(true)}
            className="text-black mt-8 bg-white hover:bg-gray-600 hover:text-white rounded-lg text-xl px-6 py-3 transition-transform duration-300 hover:scale-105"
          >
            Beli Sekarang
          </button>
        </div>
      </section>

      {/* Login */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Masuk ke Akun Anda</h3>
              <button onClick={() => setIsLoginOpen(false)}>
                <FontAwesomeIcon icon={faXmark} className="text-black" />
              </button>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black">Email</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    className="w-full p-2 ps-10 border rounded"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Password</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="password"
                    type="password"
                    className="w-full p-2 ps-10 border rounded"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="text-sm text-gray-700">
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
              <button type="submit" className="w-full bg-gray-600 hover:bg-gray-500 text-white p-2 rounded">
                Masuk
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Register */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Daftar</h3>
              <button onClick={() => setIsRegisterOpen(false)}>
                <FontAwesomeIcon icon={faXmark} className="text-black" />
              </button>
            </div>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black">Nama</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="name"
                    type="text"
                    className="w-full p-2 ps-10 border rounded"
                    placeholder="Nama lengkap"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Email</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    className="w-full p-2 ps-10 border rounded"
                    placeholder="you@example.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black">No. HP</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="phone"
                    type="text"
                    className="w-full p-2 ps-10 border rounded"
                    placeholder="08xxxxxxxxxx"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Password</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="password"
                    type="password"
                    className="w-full p-2 ps-10 border rounded"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="text-sm text-gray-700">
                Sudah punya akun?{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                  }}
                >
                  Masuk
                </button>
              </div>
              <button type="submit" className="w-full bg-gray-600 hover:bg-gray-500 text-white p-2 rounded">
                Daftar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
