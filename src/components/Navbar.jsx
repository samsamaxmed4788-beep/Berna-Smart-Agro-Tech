import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Activity, PieChart, Menu, X, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Leaf className="w-4 h-4 mr-2" /> },
    { name: 'About Us', path: '/about', icon: <Leaf className="w-4 h-4 mr-2" /> },
    { name: 'IoT Dashboard', path: '/dashboard', icon: <Activity className="w-4 h-4 mr-2" /> },
    { name: 'Investment Portal', path: '/invest', icon: <PieChart className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'} px-6 md:px-12`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-berna-green to-berna-blue flex items-center justify-center text-white shadow-lg group-hover:shadow-berna-green/50 transition-shadow">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight dark:text-white">
            Berna<span className="text-berna-green">Tech</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center font-medium transition-colors hover:text-berna-green ${
                location.pathname === link.path ? 'text-berna-green' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2">
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-800" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 dark:text-white focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center py-2 font-medium ${
                  location.pathname === link.path ? 'text-berna-green' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
