import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "Thank you for subscribing to our newsletter!",
        confirmButtonColor: "#ff512f",
      });
      setEmail("");
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#ff512f] to-[#dd2476] p-8 md:p-16 shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6"
            >
              <FaEnvelope className="text-white text-4xl" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-4xl font-extrabold text-white mb-4"
            >
              Stay Updated with New Releases
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-sm md:text-lg mb-8"
            >
              Join 10,000+ movie lovers and get weekly recommendations, new
              releases, and exclusive content delivered to your inbox.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className=" flex-1 px-6 py-4 rounded-full text-gray-800 placeholder-white border border-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-[#ff512f] font-bold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Subscribe
                <FaPaperPlane className="text-sm" />
              </button>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-white/70 text-xs mt-4"
            >
              We respect your privacy. Unsubscribe at any time.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Newsletter;
