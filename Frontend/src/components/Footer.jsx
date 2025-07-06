import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#f9f7f3] border-t border-gray-200 font-inter mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700 text-sm">
        
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <p>
            BillBog helps you write and share your thoughts, interests, and blogs anonymously.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-green-600">Home</a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-green-600">Blogs</a>
            </li>
            <li>
              <a href="/about" className="hover:text-green-600">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-green-600">Contact</a>
            </li>
          </ul>
        </div>

        {/* Social / Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow & Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">Twitter</a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-green-600">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms" className="hover:text-green-600">Terms of Service</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-200 text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} BillBog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
