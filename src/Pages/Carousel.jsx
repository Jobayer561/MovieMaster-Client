import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import FeaturedMovies from "../FeaturedMovies";

const Carousel = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/featuredMovies")
      .then((res) => res.json())
      .then((data) => setFeatured(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-[#170F29]">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={featured.length > 1}
          speed={600}
          className="my-8 w-full"
        >
          {featured.map((movie) => (
            <SwiperSlide key={movie._id}>
              <FeaturedMovies movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
