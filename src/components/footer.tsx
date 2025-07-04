import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-slate-700">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/whiteImage.png" 
                alt="NSTQB Logo" 
                className="h-20 w-auto"
              />
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={18} />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>

          {/* NSTQB Links */}
          <div className="flex flex-col justify-between space-y-6">
            <h4 className="text-lg font-semibold text-slate-800">NSTQB</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-slate-600 hover:text-blue-700 transition-colors">Home</a></li>
              <li><a href="#about" className="text-slate-600 hover:text-blue-700 transition-colors">About</a></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-blue-700 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Static Section */}
          <div className="flex flex-col justify-between space-y-6">
            <h4 className="text-lg font-semibold text-slate-800">Our Vision</h4>
            <p className="text-slate-600 leading-relaxed">
              NSTQB aims to empower software professionals in Nepal with globally recognized certifications and to promote software testing excellence nationwide.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-300 mt-12 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © 2025 NSTQB - Nepal Software Testing Qualifications Body. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
