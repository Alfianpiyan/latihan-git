import gbrHp from "../../assets/hp.jpeg";
import gbrPk from "../../assets/pakaian.jpg";
import gbrJam from "../../assets/jam.jpeg";
import { useNavigate } from "react-router-dom";

export default function Kategori() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pr-5 bg-white">
      <div className="text-center mb-8">
        <h4 className="font-bold text-xl md:text-3xl">Kategori Produk</h4>
      </div>

      <div className="flex ml-5 justify-center">
        <div className="grid grid-cols-3 gap-4 max-w-7xl">
          {/* Handphone */}
          <div
            className="relative group w-60 cursor-pointer"
            onClick={() => navigate("/kategori/hp")}
          >
            <img
              className="h-60 w-40 rounded-lg ml-10 object-cover"
              src={gbrHp}
              alt="Handphone"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/90 rounded-lg opacity-0 translate-y-4 group-hover:opacity-75 group-hover:translate-y-0 transition-all duration-300 ease-in-out flex items-end justify-center p-4">
              <p className="text-white text-center mb-10">Handphone</p>
            </div>
          </div>

          {/* Jam Tangan */}
          <div
            className="relative group w-60 cursor-pointer"
            onClick={() => navigate("/kategori/jam")}
          >
            <img
              className="h-60 w-60 rounded-lg object-cover"
              src={gbrJam}
              alt="Jam Tangan"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/90 rounded-lg opacity-0 translate-y-4 group-hover:opacity-75 group-hover:translate-y-0 transition-all duration-300 ease-in-out flex items-end justify-center p-4">
              <p className="text-white text-center mb-10">Jam Tangan</p>
            </div>
          </div>

          {/* Pakaian */}
          <div
            className="relative group w-60 cursor-pointer"
            onClick={() => navigate("/kategori/pakaian")}
          >
            <img
              className="h-60 w-60 rounded-lg object-cover"
              src={gbrPk}
              alt="Pakaian"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/90 rounded-lg opacity-0 translate-y-4 group-hover:opacity-75 group-hover:translate-y-0 transition-all duration-300 ease-in-out flex items-end justify-center p-4">
              <p className="text-white text-center mb-10">Pakaian</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
