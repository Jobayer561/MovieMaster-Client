import React from "react";
import { FaFilm, FaUsers, FaStar, FaHeart, FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router";

const AboutUs = () => {
  const highlights = [
    {
      title: "Curated Excellence",
      desc: "Handpicked titles with meaningful stories and standout craft.",
      icon: <FaFilm className="text-2xl text-[#ff512f]" />,
    },
    {
      title: "Community First",
      desc: "Built for movie lovers to share, rate, and discover together.",
      icon: <FaUsers className="text-2xl text-[#dd2476]" />,
    },
    {
      title: "Quality Insights",
      desc: "Data-driven picks, thoughtful recommendations, zero filler.",
      icon: <FaStar className="text-2xl text-amber-400" />,
    },
  ];

  const values = [
    {
      label: "Authenticity",
      detail: "We celebrate diverse voices and honest reviews.",
    },
    {
      label: "Simplicity",
      detail: "Clean experience, fast discovery, clutter-free.",
    },
    { label: "Trust", detail: "Transparent ratings backed by the community." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#ff512f]/10 via-[#dd2476]/10 to-[#7f5af0]/10"
          aria-hidden="true"
        ></div>
        <div className="max-w-[1440px] mx-auto px-6 py-16 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd2476]">
                About MovieMaster
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Crafted for people who live and breathe cinema
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                MovieMaster is a home for film enthusiasts—built to help you
                discover, collect, and enjoy the stories that move you. We blend
                human curation with data-driven insights so you spend less time
                scrolling and more time watching.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-white shadow text-sm font-semibold text-gray-800 border border-gray-200 flex items-center gap-2">
                  <FaPlayCircle className="text-[#ff512f]" /> Discover smarter
                </span>
                <span className="px-4 py-2 rounded-full bg-white shadow text-sm font-semibold text-gray-800 border border-gray-200 flex items-center gap-2">
                  <FaHeart className="text-[#dd2476]" /> Curate what you love
                </span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 grid grid-cols-2 gap-4">
              {[
                {
                  label: "Movies curated",
                  value: "5K+",
                  color: "from-[#ff512f] to-[#dd2476]",
                },
                {
                  label: "Community members",
                  value: "120K",
                  color: "from-blue-500 to-indigo-500",
                },
                {
                  label: "Avg. rating given",
                  value: "4.3/5",
                  color: "from-amber-400 to-orange-400",
                },
                {
                  label: "Watchlists created",
                  value: "48K",
                  color: "from-emerald-500 to-teal-500",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm"
                >
                  <p className="text-xs uppercase font-semibold text-gray-500 tracking-wide">
                    {item.label}
                  </p>
                  <p
                    className={`text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 pb-16 space-y-10">
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff512f]/10 to-[#dd2476]/10 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8 grid lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Our Mission
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Make movie discovery feel effortless
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We set out to remove friction from finding your next favorite
              film. With curated collections, trusted ratings, and thoughtful
              storytelling, MovieMaster helps you spend less time deciding and
              more time enjoying.
            </p>
          </div>
          <div className="space-y-4">
            {values.map((v) => (
              <div
                key={v.label}
                className="p-4 rounded-2xl bg-gradient-to-r from-[#ff512f]/5 to-[#dd2476]/5 border border-gray-100"
              >
                <p className="text-sm font-semibold text-gray-900">{v.label}</p>
                <p className="text-sm text-gray-600 mt-1">{v.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-extrabold">
              Ready to explore your next favorite film?
            </h3>
            <p className="text-sm text-white/80 mt-1">
              Browse collections, save watchlists, and share reviews with a
              vibrant community.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/movies"
              className="px-5 py-3 rounded-full bg-white text-[#dd2476] font-semibold shadow hover:shadow-lg transition"
            >
              Explore Movies
            </Link>
            <Link
              to="/contact-us"
              className="px-5 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
