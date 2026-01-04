import React from "react";
import { MdHighQuality, MdSecurity, MdSpeed, MdDevices } from "react-icons/md";
import { motion } from "framer-motion";

const AboutPlatform = () => {
  const features = [
    {
      icon: MdHighQuality,
      title: "HD & 4K Streaming",
      description:
        "Enjoy crystal-clear visuals with support for high-definition and ultra-HD formats.",
      color: "from-orange-400 to-red-500",
      iconColor: "text-orange-400",
    },
    {
      icon: MdSpeed,
      title: "Lightning Fast",
      description:
        "Optimized for speed—browse and stream without buffering or delays.",
      color: "from-pink-400 to-purple-500",
      iconColor: "text-pink-400",
    },
    {
      icon: MdSecurity,
      title: "Secure & Private",
      description:
        "Your data is protected with end-to-end encryption and secure login.",
      color: "from-red-400 to-pink-500",
      iconColor: "text-red-400",
    },
    {
      icon: MdDevices,
      title: "Cross-Device Access",
      description: "Watch on any device—mobile, tablet, desktop, or smart TV.",
      color: "from-yellow-400 to-orange-500",
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <div className="py-12 bg-linear-to-b from-base-200/50 to-base-100">
      <div className="max-w-[1440px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold primary mb-3">
            Welcome to MovieMaster Pro
          </h2>
          <div className="h-1 w-32 bg-linear-to-r from-[#ff512f] to-[#dd2476] rounded-full mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            MovieMaster Pro is your ultimate destination for discovering,
            streaming, and managing movies with speed, style, and security.
            Designed for cinephiles and casual viewers alike.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  backgroundImage: `linear-linear(to bottom right, var(--tw-linear-stops))`,
                }}
              ></div>

              <div
                className={`inline-flex p-4 rounded-xl bg-linear-to-br ${feature.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon size={32} className="text-white" />
              </div>

              <h3 className="text-xl font-bold mb-3 primary group-hover:text-[#ff512f] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>

              <div
                className={`absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r ${feature.color} group-hover:w-full transition-all duration-500`}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPlatform;
