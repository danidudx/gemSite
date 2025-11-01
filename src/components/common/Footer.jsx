import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-medium mb-4">CUSTOMER SERVICE</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">ABOUT</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/about-us" className="hover:text-white">
                  Our Story
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">EDUCATION</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Diamond Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Ring Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Jewelry Care
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">CONNECT</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Jwellco. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
