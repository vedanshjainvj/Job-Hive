import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaDribbble,
  FaGoogle,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
     <footer className="bg-white text-gray-800">
      {/* Line Above Footer */}
      <hr className="border-t-2 border-gray-300" />

      <div className="container mx-auto px-6 py-10">
        {/* Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div>
            <h2 className="text-3xl font-bold font-poppins">
              Job
              <span className="text-red-500 decoration-black decoration-2">
                Hive
              </span>
            </h2>
            <p className="mt-4 text-gray-600">
              Collin Street West, Victor 8007, Australia.
            </p>
            <p className="mt-2 text-gray-600">+1 246-345-0695</p>
            <p className="mt-2 text-gray-600">info@jobhunt.com</p>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold text-purple-700">About Us</h3>
            <ul className="mt-4 space-y-2">
              {["Product", "Terms & Policies", "FAQ's", "Job Packages", "CV Packages"].map((item) => (
                <li
                  key={item}
                  className="hover:text-red-500 transition-colors duration-300 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Icons (Now Horizontal) */}
          <div>
            <h3 className="text-lg font-semibold text-purple-700">Follow Us</h3>
            <div className="mt-4 flex gap-4 flex-wrap">
              {[FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaDribbble, FaGoogle, FaLinkedinIn].map((Icon, index) => (
                <Icon
                  key={index}
                  size={24}
                  className="text-gray-600 hover:text-red-500 transition-colors duration-300"
                />
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold text-purple-700">Still Need Help?</h3>
            <p className="mt-4 text-gray-600">
              Let us know about your issue, and a professional will reach out.
            </p>
            <div className="mt-4 flex items-center rounded-full shadow-lg hover:shadow-xl focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
              <input
                type="email"
                placeholder="Enter Valid Email Address"
                className="flex-1 px-4 py-3 rounded-l-full outline-none text-gray-700"
              />
              <button className="bg-red-500 hover:bg-purple-700 transition-all duration-300 px-6 py-3 text-white rounded-r-full">
                <HiArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-gray-300 pt-6 mt-6 text-center">
          <p className="text-gray-600 text-sm">© {currentYear} Job Hive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
