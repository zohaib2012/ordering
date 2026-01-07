// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div>
//             <h3 className="text-2xl font-bold text-orange-500 mb-4">FoodExpress</h3>
//             <p className="text-gray-400">
//               Delicious food delivered to your doorstep. Order your favorite meals online.
//             </p>
//             <div className="flex space-x-4 mt-6">
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <Facebook className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <Twitter className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <Instagram className="h-5 w-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li><Link to="/menu" className="text-gray-400 hover:text-white">Menu</Link></li>
//               <li><Link to="/" className="text-gray-400 hover:text-white">Deals</Link></li>
//               <li><Link to="/" className="text-gray-400 hover:text-white">About Us</Link></li>
//               <li><Link to="/" className="text-gray-400 hover:text-white">Contact</Link></li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Support</h4>
//             <ul className="space-y-2">
//               <li><Link to="/" className="text-gray-400 hover:text-white">FAQ</Link></li>
//               <li><Link to="/" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
//               <li><Link to="/" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
//               <li><Link to="/" className="text-gray-400 hover:text-white">Refund Policy</Link></li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
//             <div className="space-y-3">
//               <div className="flex items-center space-x-3">
//                 <Phone className="h-5 w-5 text-orange-500" />
//                 <span className="text-gray-400">+1 234 567 8900</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Mail className="h-5 w-5 text-orange-500" />
//                 <span className="text-gray-400">support@foodexpress.com</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <MapPin className="h-5 w-5 text-orange-500" />
//                 <span className="text-gray-400">123 Food Street, City, Country</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//           <p>&copy; {new Date().getFullYear()} FoodExpress. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-orange-500">
              FoodExpress
            </Link>
            <p className="text-gray-400 mt-2">
              Delicious food delivered to your doorstep
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <div className="flex space-x-6 mb-4">
              <Link to="/" className="text-gray-400 hover:text-white">
                Terms
              </Link>
              <Link to="/" className="text-gray-400 hover:text-white">
                Privacy
              </Link>
              <Link to="/" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} FoodExpress. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;