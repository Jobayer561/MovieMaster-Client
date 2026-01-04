import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Movie Enthusiast",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      comment:
        "MovieMaster Pro has completely changed how I discover and watch movies. The interface is beautiful and so easy to use!",
    },
    {
      name: "Michael Chen",
      role: "Film Critic",
      avatar: "https://i.pravatar.cc/150?img=13",
      rating: 5,
      comment:
        "Best movie platform I've used. The collection is vast and the recommendations are spot-on. Highly recommended!",
    },
    {
      name: "Emily Rodriguez",
      role: "Casual Viewer",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      comment:
        "Love the personalized watchlist feature! Makes keeping track of movies I want to see so much easier.",
    },
    {
      name: "David Williams",
      role: "Cinema Lover",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      comment:
        "The streaming quality is amazing and the variety of genres is incredible. This is my go-to platform now!",
    },
  ];

  return (
    <div className="py-16 bg-linear-to-b from-base-200/30 to-base-100">
      <div className="max-w-[1440px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold primary mb-2">
            What Our Users Say
          </h2>
          <div className="h-1 w-24 bg-linear-to-r from-[#ff512f] to-[#dd2476] rounded-full mx-auto mb-3"></div>
          <p className="text-gray-500">Trusted by thousands of movie lovers</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-[#ff512f]/10 group-hover:text-[#ff512f]/20 transition-colors">
                <FaQuoteLeft className="text-6xl transform translate-x-4 -translate-y-2" />
              </div>

              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#ff512f]/30 group-hover:border-[#ff512f] transition-colors"
                  />
                  <div>
                    <h3 className="font-bold primary text-lg">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-[#ff512f] to-[#dd2476] group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
