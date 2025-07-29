import { useEffect, useState } from "react";
import gbrSofa from '../../assets/Sofa.png';
import gbrBed from '../../assets/daybed.png';
import gbrKursi from '../../assets/kursi.png';

const images = [gbrSofa, gbrBed, gbrKursi];

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="pt-24 pb-10 bg-white dark:bg-gray-800 relative w-full ">
      <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="mx-auto max-h-64 md:max-h-96 object-contain"
            />
          </div>
        ))}
      </div>

      <div className="absolute z-0 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleIndicatorClick(i)}
            className={`w-3 h-3 rounded-full ${i === activeIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handlePrev}
        className="absolute top-0 left-0 z-0 flex items-center justify-center h-full px-4 cursor-pointer group"
      >
        <span className="ml-50 p-3 mt-10 sm:block hidden items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/60">
          <svg className=" w-4 h-4 text-black" fill="none" viewBox="0 0 6 10">
            <path d="M5 1L1 5l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="absolute top-0 right-0 z-0 flex items-center justify-center h-full px-4 cursor-pointer group"
      >
        <span className="mr-50 p-3 mt-10 sm:block hidden items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/60">
          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 6 10">
            <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
