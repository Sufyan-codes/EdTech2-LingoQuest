import React from "react";
import logo from "../../src/assets/Icons/logo.svg";
import instagram from "../../src/assets/Icons/mdi_instagram.svg";
import x from "../../src/assets/Icons/Vector.svg";
import linkedin from "../../src/assets/Icons/basil_linkedin-outline.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#053A39] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 py-12 border-[#4D9B9A] border-b">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={logo} alt="LingoQuest logo" className="h-8" />
            <p className="text-sm leading-relaxed">
              Empowering learners to speak the world's languages
            </p>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">About</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-white transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Connect</h3>
            <div className="flex gap-3">
              <Link 
                to="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-[#378F8D] rounded-full hover:bg-[#2a716f] transition-colors"
              >
                <img src={linkedin} alt="LinkedIn" className="w-5 h-5" />
              </Link>
              <Link 
                to="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-[#378F8D] rounded-full hover:bg-[#2a716f] transition-colors"
              >
                <img src={x} alt="X (Twitter)" className="w-5 h-5" />
              </Link>
              <Link 
                to="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-[#378F8D] rounded-full hover:bg-[#2a716f] transition-colors"
              >
                <img src={instagram} alt="Instagram" className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 text-center">
          <p className="text-sm">
            © 2025 LingoQuest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}