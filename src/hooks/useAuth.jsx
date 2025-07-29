
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  /**
   * Mendaftarkan pengguna baru dan menyimpannya ke Local Storage.
   * @param {object} userData - Objek yang berisi data pengguna (name, email, phoneNumber, password).
   * @returns {boolean} True jika pendaftaran berhasil, false jika email sudah terdaftar.
   */
  const register = (userData) => {
    const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

   
    const emailExists = users.some(user => user.email === userData.email);
    if (emailExists) {
      alert("Email ini sudah terdaftar. Silakan gunakan email lain atau login.");
      return false; 
    }

   
    users.push(userData);

    localStorage.setItem("users", JSON.stringify(users));
    
    
    localStorage.setItem("isLoggedIn", "true");
    
    localStorage.setItem("currentUser", JSON.stringify(userData));

    navigate("/home");
    return true; 
  };

  /**
   * @param {string} email 
   * @param {string} password
   * @returns {boolean} 
   */
  const login = (email, password) => {
    const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];


    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
     
      localStorage.setItem("isLoggedIn", "true");
     
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      navigate("/home");
      return true;
    } else {
      alert("Email atau password salah. Silakan coba lagi.");
      return false; 
    }
  };

 
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/landing");
  };

/** 
   @returns {object|null} 
*/   

  const getUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
  };


  /** 
   @returns {boolean} 
   
  */

  const isAuthenticated = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };

  return { register, login, logout, getUser, isAuthenticated };
}