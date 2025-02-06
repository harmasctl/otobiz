import React from "react";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">
              AutoTrader Senegal
            </h3>
            <p className="text-sm">
              Your trusted partner in finding the perfect vehicle in Senegal.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Car Reviews
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sell Your Car
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Car Finance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Car Insurance
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>123 Main Street, Dakar, Senegal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+221 12 345 6789</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>contact@autotrader.sn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} AutoTrader Senegal. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
