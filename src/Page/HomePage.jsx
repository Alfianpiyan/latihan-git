import React, { useEffect } from "react"; // <-- ini untuk useEffect
import { useLocation } from "react-router-dom"; // <-- ini untuk useLocation

import Navbar2 from "../component/HomePage/navbar2"
import Banner  from "../component/HomePage/banner"
import Kategori from "../component/HomePage/kategori"
import Rekomendasi from "../component/HomePage/rekomendasi"
import Populer from "../component/HomePage/populer"
import Produk1 from "../component/HomePage/produk1"
import Footer2 from "../component/HomePage/footer2"




const HomePage = () => {

    const location = useLocation();

  useEffect(() => {
    if (location.state?.success) {
      alert(location.state.success);
    }
  }, [location]);

    return (
        <>
        
            <Navbar2/>
            <Banner/>
            <Kategori/>
            <Rekomendasi/>
            <Populer/>
            <Produk1/>
            <Footer2/>
            

            
            
        </>
    )
}
export default HomePage