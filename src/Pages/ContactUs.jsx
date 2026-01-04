import React from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ContactUs = () => {
  const contacts = [
    {
      title: "Email",
      detail: "support@moviemaster.com",
      icon: <FaEnvelope className="text-xl text-[#ff512f]" />,
    },
    {
      title: "Phone",
      detail: "+8801722233463",
      icon: <FaPhone className="text-xl text-[#dd2476]" />,
    },
    {
      title: "Hours",
      detail: "Mon - Fri, 9am - 6pm (UTC)",
      icon: <FaClock className="text-xl text-indigo-500" />,
    },
    {
      title: "Studio",
      detail: "Mirpur 1201, Dhaka, Bangladesh",
      icon: <FaMapMarkerAlt className="text-xl text-emerald-500" />,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };
    console.log("Contact form submitted", payload);
    toast.success("Thanks for reaching out! We'll get back to you soon.");
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 py-16 space-y-10">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dd2476]">
            Contact Us
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            We would love to hear from you
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Questions, feedback, partnerships, or press—drop a line and the
            MovieMaster team will respond.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {contacts.map((c) => (
            <div
              key={c.title}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-lg flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff512f]/10 to-[#dd2476]/10 flex items-center justify-center">
                {c.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {c.title}
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {c.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
          <div className="p-8 bg-gradient-to-br from-[#ff512f] via-[#dd2476] to-[#7f5af0] text-white">
            <h2 className="text-3xl font-extrabold mb-3">
              Tell us what you need
            </h2>
            <p className="text-white/90 mb-6">
              Share the details of your request so we can connect you with the
              right person on our team.
            </p>
            <ul className="space-y-3 text-white/90">
              <li>• Account or billing questions</li>
              <li>• Feature requests and feedback</li>
              <li>• Partnerships, press, or support</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">
                  Name
                </span>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  className="mt-2 input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#ff512f]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">
                  Email
                </span>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#dd2476]"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-gray-700">
                Subject
              </span>
              <input
                required
                name="subject"
                type="text"
                placeholder="How can we help?"
                className="mt-2 input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#ff512f]"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-gray-700">
                Message
              </span>
              <textarea
                required
                name="message"
                rows="5"
                placeholder="Share a few details so we can respond effectively"
                className="mt-2 textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#dd2476]"
              ></textarea>
            </label>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white font-semibold py-3 rounded-full shadow-lg hover:scale-[1.01] transition-transform"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
