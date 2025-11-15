import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import FeaturedMovies from "../FeaturedMovies";
import { motion } from "framer-motion";
import { CircleLoader } from "react-spinners";

const Carousel = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://b12-a10-movie-master-server.vercel.app/featuredMovies")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {loading ? (
        <div className="max-w-7xl mx-auto h-[90vh] flex justify-center items-center">
          <CircleLoader size={80} color="#FF6B6B" />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={featured.length > 1}
            speed={600}
            className="w-full"
          >
            {featured.map((movie) => (
              <SwiperSlide key={movie._id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <FeaturedMovies movie={movie} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </motion.div>
  );
};

export default Carousel;
