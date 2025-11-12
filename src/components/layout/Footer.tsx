import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-blue-50 to-indigo-50 border-t mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">ZPIRE</span>
              <span className="text-2xl font-medium ml-1">Nutrition</span>
            </Link>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Empowering elderly individuals and care facilities with personalized nutrition analysis and recommendations for healthier, happier lives.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">•</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">•</span> Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">•</span> Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">•</span> Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">•</span> FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-blue-600 mr-2 shrink-0 mt-1" />
                <span className="text-gray-600">123 Nutrition Avenue, Health City, HC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-blue-600 mr-2 shrink-0" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-blue-600 mr-2 shrink-0" />
                <span className="text-gray-600">contact@zpirenutrition.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-100 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="flex items-center text-gray-600 mb-4 md:mb-0">
              Made with <Heart size={16} className="mx-1 text-red-500" /> for better elderly nutrition
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Accessibility
              </Link>
            </div>
          </div>
          <p className="text-gray-500 mt-4 text-center md:text-left text-sm">
            © {new Date().getFullYear()} Aura. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
