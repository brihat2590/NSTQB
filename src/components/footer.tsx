import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-slate-700">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between">
          {/* Company Info */}
          <div className="flex flex-col items-start">
            <img 
              src="/whiteImage.png" 
              alt="NSTQB Logo" 
              className="h-15 w-auto mb-6"
            />
            <div className="flex items-center space-x-2">
              <MapPin className="text-blue-600 flex-shrink-0" size={16} />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>

          {/* NSTQB Links */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-semibold text-slate-800 mb-3">NSTQB</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-slate-600 hover:text-blue-700 transition-colors">Home</a></li>
              <li><Link href="/mock-test" className="text-slate-600 hover:text-blue-700 transition-colors">Exam</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-blue-700 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Static Section */}
          <div className="flex flex-col items-start max-w-xs">
            <h4 className="text-lg font-semibold text-slate-800 mb-3">Our Vision</h4>
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
