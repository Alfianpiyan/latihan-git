import { useState } from "react";
import { useNavigate } from "react-router-dom";
import gbrTamu from "../../assets/ruangTamu.jpg";
import {
  faEnvelope,
  faLock,
  faUser,
  faXmark,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";

export default function Section1() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginData.email, loginData.password);
    setIsLoginOpen(false);
    navigate("/home"); 
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register(registerData);
    setIsRegisterOpen(false);
    navigate("/home"); 
  };

  return (
    <>
      <div className="pt-24 pr-5 bg-white dark:bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 items-center -mt-10 gap-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white leading-snug">
              Dari kenyamanan <br /> hingga gaya, semua <br /> kebutuhan Anda ada <br /> di satu tempat.
            </h2>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="mt-8 bg-white hover:bg-gray-600 hover:text-white transition-transform duration-300 hover:scale-105 rounded-lg text-xl px-4 py-2 text-gray-800"
            >
              Beli Sekarang
            </button>
          </div>
          <div>
            <img
              src={gbrTamu}
              alt="hero ruang tamu"
              className="w-full max-h-[400px] rounded-xl shadow-md object-cover"
            />
          </div>
        </div>
      </div>

      {/* Login */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Masuk ke akun Anda
              </h3>
              <button onClick={() => setIsLoginOpen(false)}>
                <FontAwesomeIcon icon={faXmark} className="text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    className="w-full p-2 pl-10 border rounded"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="password"
                    className="w-full p-2 pl-10 border rounded"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
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
              <button
                type="submit"
                className="w-full bg-gray-600 hover:bg-gray-400 transition-all text-white p-2 rounded"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Register */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Daftar</h3>
              <button onClick={() => setIsRegisterOpen(false)}>
                <FontAwesomeIcon icon={faXmark} className="text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nama</label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    className="w-full p-2 pl-10 border rounded"
                    placeholder="Nama lengkap"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    className="w-full p-2 pl-10 border rounded"
                    placeholder="you@example.com"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">No HP</label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    className="w-full p-2 pl-10 border rounded"
                    placeholder="08xxxxxxxxx"
                    value={registerData.phone}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="password"
                    className="w-full p-2 pl-10 border rounded"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-600 hover:bg-gray-500 transition-all text-white p-2 rounded"
              >
                Daftar
              </button>
            </form>
            <div className="mt-4 text-sm text-center text-black">
              Sudah punya akun?{" "}
              <button
                className="text-blue-600"
                onClick={() => {
                  setIsRegisterOpen(false);
                  setIsLoginOpen(true);
                }}
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
