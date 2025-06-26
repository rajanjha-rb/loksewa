import { Link } from "react-router-dom";
import Logo from "../Logo";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-blue-600 pt-12 pb-8 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-wrap -mx-6">
          {/* Logo & Copy */}
          <div className="w-full md:w-1/2 lg:w-5/12 px-6 mb-12 md:mb-0 flex flex-col justify-between">
            <Link
              to="/"
              className="mb-5 inline-flex items-center gap-3 hover:opacity-90 transition-opacity duration-300"
              aria-label="Loksewa Academy Home"
            >
              <img
                src="/logo.svg"
                alt="Loksewa Academy Logo"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              © {new Date().getFullYear()} Loksewa Academy. All rights reserved.
            </p>
            <div className="flex mt-6 space-x-6">
              <a
                href="https://www.facebook.com/profile.php?id=61577022802153"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-500 transition-colors"
              >
                <Facebook size={22} />
              </a>
              <a
                href="https://www.instagram.com/codocu_official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-sky-400 transition-colors"
              >
                <Twitter size={22} />
              </a>
              <a
                href="https://www.instagram.com/codocu_official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-500 transition-colors"
              >
                <Instagram size={22} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="w-full md:w-1/2 lg:w-2/12 px-6 mb-10 md:mb-0">
            <h4 className="text-sm font-semibold text-white uppercase mb-6 tracking-wider">
              Company
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full md:w-1/2 lg:w-2/12 px-6 mb-10 md:mb-0">
            <h4 className="text-sm font-semibold text-white uppercase mb-6 tracking-wider">
              Support
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Account
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full md:w-1/2 lg:w-3/12 px-6">
            <h4 className="text-sm font-semibold text-white uppercase mb-6 tracking-wider">
              Legal
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
