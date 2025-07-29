import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faTruck, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export default function Section3() {
  return (
    <section className="py-12 bg-white items-center text-center mt-8">
      <h2 className="text-2xl font-bold mb-10">
        Benefit yang anda dapatkan ketika <br /> menggunakan layanan kami
      </h2>
      
      <div className="flex flex-col md:flex-row justify-center gap-10">
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faMedal} className="text-4xl mb-4 text-black" />
          <h3 className="font-semibold text-lg">Kualitas Terbaik</h3>
          <p className="text-sm text-gray-600">Dirancang dengan standar <br /> kualitas tertinggi.</p>
        </div>

        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faTruck} className="text-4xl mb-4 text-black" />
          <h3 className="font-semibold text-lg">Pengiriman Gratis</h3>
          <p className="text-sm text-gray-600">
            Nikmati pengiriman gratis tanpa <br /> minimum belanja!
          </p>
        </div>

        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faShieldAlt} className="text-4xl mb-4 text-black" />
          <h3 className="font-semibold text-lg">Jaminan</h3>
          <p className="text-sm text-gray-600">
            Garansi resmi untuk <br /> setiap pembelian.
          </p>
        </div>
      </div>
    </section>
  );
}
