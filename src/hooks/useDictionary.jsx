import { useState, useEffect } from 'react'
export const useDictionary = (text) => {
      const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "id";
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const lang = localStorage.getItem("language") || "id";
      setLanguage(lang);
    };

    // Optional: jika ada sistem broadcast (cross-tab)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const dictionary = [
    { key: "bantuan", id: "Bantuan", en: "Helpdesk" },
    { key: "selamat", id: "Selamat Datang", en: "Welcome" },
  ];

  const entry = dictionary.find((item) => item.key === text);
  const label = entry ? entry[language] || entry["id"] : text;

  return label;
}