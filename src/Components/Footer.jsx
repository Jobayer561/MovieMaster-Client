import React from "react";
import { BiSolidCameraMovie } from "react-icons/bi";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Movies", to: "/movies" },
    { label: "About", to: "/about-us" },
    { label: "Contact", to: "/contact-us" },
  ];

  const socials = [
    { icon: <FaXTwitter />, href: "https://twitter.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaFacebookF />, href: "https://facebook.com" },
    { icon: <FaYoutube />, href: "https://youtube.com" },
  ];

  return (
    <footer className="bg-neutral-900 text-gray-200 px-6 py-12">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link
            to="/"
            className="logo text-2xl font-extrabold flex items-center gap-1 text-white"
          >
            <span className="tracking-tight">Movie</span>
            <span className="text-[#FF6B6B] animate-bounce">
              <BiSolidCameraMovie size={24} />
            </span>
            <span className="tracking-tight">Master</span>
          </Link>

          <p className="text-gray-400 text-sm max-w-sm">
            Discover, track, and celebrate cinema. Curated picks, trusted
            ratings, and community-powered recommendations.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h1 className="font-semibold text-lg mb-2 text-white">Quick Links</h1>
          <nav className="flex flex-col gap-3 text-gray-400 text-sm">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h1 className="font-semibold text-lg mb-2 text-white">Support</h1>
          <div className="text-gray-400 text-sm space-y-2">
            <p>Questions? Reach us at</p>
            <a
              href="mailto:support@moviemaster.com"
              className="hover:text-white block"
            >
              support@moviemaster.com
            </a>
            <a href="tel:+15551234567" className="hover:text-white block">
              +8801722239561
            </a>
            <p className="text-xs text-gray-500">Mon - Fri, 9am - 6pm (UTC)</p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-5">
          <h1 className="font-semibold text-lg mb-2 text-white">Follow Us</h1>

          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-lg text-white hover:bg-white hover:text-neutral-900 transition"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-500">
          Copyright © {new Date().getFullYear()} — All rights reserved by{" "}
          <Link to={'/'} className="font-semibold text-white">MovieMaster</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
