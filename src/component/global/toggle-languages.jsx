import { useState } from "react";

export default function ToogleLanguages() {
  const [language, setLanguage] = useState("id");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Misalnya simpan ke localStorage jika ingin tetap tersimpan
    localStorage.setItem("language", e.target.value);
  };

  return (
    <div className="p-4">
      <h2>Pilih Bahasa / Choose Language:</h2>

      <div className="mt-2">
        <label className="mr-4">
          <input
            type="radio"
            value="id"
            checked={language === "id"}
            onChange={handleLanguageChange}
          />
          <span className="ml-1">Bahasa Indonesia</span>
        </label>

        <label>
          <input
            type="radio"
            value="en"
            checked={language === "en"}
            onChange={handleLanguageChange}
          />
          <span className="ml-1">English</span>
        </label>
      </div>

      <div className="mt-4">
        {language === "id" ? (
          <p>Selamat datang di aplikasi kami!</p>
        ) : (
          <p>Welcome to our application!</p>
        )}
      </div>
    </div>
  );
}
