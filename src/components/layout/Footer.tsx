import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">ZPIRE</span>
              <span className="text-xl font-medium ml-1">Nutrition</span>
            </Link>
            <p className="text-gray-600 mt-2">
              Helping elderly people make better nutritional choices
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <Link to="/about" className="text-gray-600 hover:text-gray-900 py-1">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 py-1">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-gray-900 py-1">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-gray-900 py-1">
              Terms of Service
            </Link>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className="flex items-center justify-center text-gray-600">
            Made with <Heart size={16} className="mx-1 text-red-500" /> for better elderly nutrition
          </p>
          <p className="text-gray-500 mt-2">
            © {new Date().getFullYear()} ZPIRE Nutrition. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
