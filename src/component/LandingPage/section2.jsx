import gbrHp from "../../assets/hp.jpeg"
import gbrPk from "../../assets/pakaian.jpg"
import gbrJam from "../../assets/jam.jpeg"


import { useNavigate } from "react-router-dom";



export default function Section2() {
    return (
        <div className="pt-24 pr-5 bg-white">
            <div className="text-center mb-8">
                <h2 className="font-bold text-xl  md:text-4xl">Produk Terbaik Kami</h2>
                <h3>Temukan berbagai produk berkualitas dari <br/> berbagai kategori, dirancang untuk memenuhi <br/>kebutuhan dan gaya hidup Anda sehari-hari.</h3>


            </div>

                <div className="flex ml-5 justify-center">
                    <div className="grid grid-cols-3 gap-4 max-w-7xl">

                        <div className="relative group w-90">
                            <img className="h-65 w-65 rounded-lg ml-10" src={gbrHp} alt="" />
                                <div className="absolute bottom-0 left-0 right-0 h-65 bg-gradient-to-b from-black/0 to-black/90 rounded-lg opacity-0 translate-y-4 group-hover:opacity-75 group-hover:translate-y-0 transition-all duration-300 ease-in-out flex items-end justify-center p-4">
                                    <p className="text-white text-center mb-10">Handphone</p>
                                </div>
                        </div>

                        <div className="relative group w-90">
                            <img className="h-65 w-115 rounded-lg" src={gbrJam} alt="" />
                                <div className="absolute bottom-0 left-0 right-0 h-65 bg-gradient-to-b from-black/0 to-black/90 rounded-lg opacity-0 translate-y-4 group-hover:opacity-75 group-hover:translate-y-0 transition-all duration-300 ease-in-out flex items-end justify-center p-4">
                                    <p className="text-white text-center mb-10">Jam Tangan</p>
                                </div>
                        </div>

                        <div className="relative group w-90">
                            <img className="h-65 w-115 rounded-lg" src={gbrPk} alt="" />
                                <div className="absolute bottom-0 left-0 right-0 h-65 bg-gradient-to-b from-black/0 to-black/90 rounded-lg opacity-0 translate-y-4 group-hover:opacity-75 hover:translate-y-0 transition-all duration-300 ease-in-out flex items-end justify-center p-4">
                                    <p className="text-white text-center mb-10">Pakaian</p>
                                <div/>
                        </div>


                  </div>
                </div>
            </div>

        </div>
    );
}
