import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar2 from "../HomePage/navbar2";
import Footer2 from "../HomePage/footer2";
import useAuth from "../../hooks/useAuth";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { getUser, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Ambil data user saat halaman loding
  useEffect(() => {
    const user = getUser();
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: user.password || "",
      });
      setProfileImage(user.profileImage || null);
    }
  }, []);

  // Handle input perubahan teks (nama, email, dll)
  const handleInputChange = (e) => {
    const updated = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updated);

    const existing = getUser();
    const merged = { ...existing, ...updated, profileImage };
    localStorage.setItem("userData", JSON.stringify(merged));
  };

  // Handle perubahan gambar profil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        const existing = getUser();
        const updated = { ...existing, profileImage: reader.result };
        localStorage.setItem("userData", JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-[#2C2E37] flex items-center justify-center -mb-10 p-6">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* Kiri - Foto Profil */}
          <div className="bg-white w-[300px] h-[300px] rounded-lg flex items-center justify-center">
            <label htmlFor="profileImgInput" className="cursor-pointer">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt=""
                className="w-44 h-44 object-cover rounded-full bg-gray-300"
              />
              <input
                id="profileImgInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Kanan - Form */}
          <div className="bg-white w-[500px] rounded-lg p-6 space-y-4">
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-gray-300 p-2 rounded"
                  placeholder="Masukkan nama"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-300 p-2 rounded"
                  placeholder="Masukkan email"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold">No. HP</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-gray-300 p-2 rounded"
                  placeholder="Masukkan no. hp"
                />
              </div>
            </div>

            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-2 text-black font-semibold mt-4 hover:text-red-600 transition"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              Keluar Akun
            </button>
          </div>
        </div>

        {/* Popup Konfirmasi Logout */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm text-center">
              <h2 className="text-lg font-semibold mb-4">Yakin mau keluar?</h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Iya
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer2 />
    </>
  );
}
