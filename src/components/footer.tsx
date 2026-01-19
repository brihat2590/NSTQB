"use client";

import {
  FaGithub,
  FaXTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-blue-50 to-red-50 border-t  py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Social Icons */}
        <div className="flex gap-6 text-2xl  text-gray-800">
          <a
            href="https://github.com/NSTQB"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition"
          >
            <FaGithub />
          </a>

          

          <a
            href="https://www.linkedin.com/company/nstqb/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.facebook.com/NSTQB"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaFacebook />
          </a>
        </div>

        {/* Info Section */}
        <div className="text-sm text-gray-600 space-y-2">
          <p className="font-medium text-gray-800">
            © 2025 NSTQB – Nepal Software Testing Qualifications Board
          </p>

          <p className="flex items-center gap-2">
            <MdEmail className="text-pink-800" />
            <a
              href="mailto:info@nstqb.org"
              className="hover:text-blue-600 transition"
            >
              info@nstqb.org
            </a>
          </p>

          <p>
            NSTQB operates under ISTQB® to promote excellence in software testing.
          </p>
        </div>
      </div>
    </footer>
  );
}
