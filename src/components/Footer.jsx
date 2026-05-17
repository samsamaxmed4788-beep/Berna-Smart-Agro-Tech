import { Link } from 'react-router-dom';
import { Leaf, Mail, MapPin, Phone, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-berna-green to-berna-blue flex items-center justify-center text-white shadow-lg">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Berna <span className="text-berna-green">Agro Tech</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Pioneering the future of sustainable agriculture in Somaliland through AI-driven hydroponics and smart IoT systems.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-berna-blue hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-berna-green transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-berna-green transition-colors">IoT Dashboard</Link>
              </li>
              <li>
                <Link to="/invest" className="hover:text-berna-green transition-colors">Investment Portal</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-berna-green transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Docs */}
          <div>
            <h3 className="text-white font-bold mb-6">Legal & Docs</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-berna-green transition-colors">Smart Contract Terms</a>
              </li>
              <li>
                <a href="#" className="hover:text-berna-green transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-berna-green transition-colors">API Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-berna-green transition-colors">Whitepaper</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-berna-green shrink-0" />
                <span className="text-slate-400">Jigjiga-yar, Hargeisa, Somaliland</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-berna-green shrink-0" />
                <span className="text-slate-400">+252 63 448 2134</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-berna-green shrink-0" />
                <span className="text-slate-400">info@bernatech.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {currentYear} Berna Smart Agro-Tech Complex. All rights reserved.</p>
          <p>Built with ❤️ in Somaliland.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
