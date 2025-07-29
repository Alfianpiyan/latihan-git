import { FaInstagram, FaFacebook, FaWhatsapp, FaPhone, FaEnvelope, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { SiLinktree } from 'react-icons/si';
import ToogleLanguages from '../global/toggle-languages';
import { useDictionary } from '../../hooks/useDictionary';

export default function Footer3() {
  console.log("Footer kelihatan");
  console.log(useDictionary('bantuan'))
  return (
    <div className='bg-gray-800 dark:bg-gray-700 text-white py-10 px-8 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm'>
      <div>
        <h2 className="text-lg font-bold">P-Store</h2>
        <p className="mt-4">
          P-Store adalah platform terbaik untuk Barang-barang berkualitas.
        </p>

        <div className="mt-13">
          <h3 className="font-bold mb-2">Ikuti Kami</h3>
          <div className="flex gap-4 text-white">
            <a href="#"><FaInstagram size={24} /></a>
            <a href="#"><FaFacebook size={24} /></a>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold">Layanan</h2>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center gap-2 ">
            <FaWhatsapp size={22} /> +62 8123 4567 123
          </li>
          <li className="flex items-center gap-2">
            <FaPhone size={18}/> +62 8976 4352 123
          </li>
          <li className="flex items-center gap-2">
            <FaEnvelope size={18}/> P_Store@gmail.com
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-bold">Bantuan</h2>
        <ul className="mt-4 space-y-2">
          <li><a href="#" className="hover:underline">Info Pengiriman</a></li>
          <li><a href="#" className="hover:underline">Cara Pemesanan</a></li>
          <li><a href="#" className="hover:underline">FAQ</a></li>
          <li><a href="#" className="hover:underline">Privacy Policy</a></li>
        </ul>
        <ToogleLanguages />
      </div>

      <div className="md:col-span-3 mt-4">
        <h3 className="font-bold mb-4">Bekerja sama dengan</h3>
        <div className="flex gap-6 items-center">
          <FaCcVisa size={40} className="text-white" />
          <FaCcMastercard size={40} className="text-white" />
          <SiLinktree size={35} className="text-white" />
        </div>
      </div>
    </div>
  );
}
