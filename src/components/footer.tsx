import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-slate-700">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/whiteImage.png" 
                alt="NSTQB Logo" 
                className="h-16 w-auto"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-slate-600">this building</p>
                  <p className="text-slate-600">this place</p>
                  <p className="text-slate-600">Kathmandu, Nepal.</p>
                </div>
              </div>
            </div>
          </div>

          {/* NSTQB Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-800">NSTQB</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-slate-600 hover:text-blue-700 transition-colors">Home</a></li>
              <li><a href="#about" className="text-slate-600 hover:text-blue-700 transition-colors">About</a></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-blue-700 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-800">SUBSCRIBE</h4>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Get latest updates and offers. Subscribe your Email for weekly Newsletter and business tips
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email..."
                className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-l-lg focus:outline-none focus:border-blue-500 text-slate-700 placeholder-slate-400"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg transition-colors text-white">
                <Mail size={18} />
              </button>
            </div>
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
