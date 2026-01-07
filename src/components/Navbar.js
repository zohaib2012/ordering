// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import { ShoppingCart, User, Menu as MenuIcon, X } from 'lucide-react';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { cartCount } = useCart();
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="text-2xl font-bold text-orange-600">
//             FoodExpress
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link to="/" className="text-gray-700 hover:text-orange-600">
//               Home
//             </Link>
//             <Link to="/menu" className="text-gray-700 hover:text-orange-600">
//               Menu
//             </Link>
            
//             {user ? (
//               <>
//                 <Link to="/orders" className="text-gray-700 hover:text-orange-600">
//                   My Orders
//                 </Link>
//                 {user.role === 'admin' && (
//                   <Link to="/admin" className="text-gray-700 hover:text-orange-600">
//                     Admin
//                   </Link>
//                 )}
//               </>
//             ) : null}
//           </div>

//           {/* Right Side */}
//           <div className="flex items-center space-x-4">
//             {/* Cart */}
//             <Link to="/cart" className="relative">
//               <ShoppingCart className="h-6 w-6 text-gray-700" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* User Menu */}
//             {user ? (
//               <div className="relative group">
//                 <button className="flex items-center space-x-2">
//                   <User className="h-6 w-6 text-gray-700" />
//                   <span className="hidden md:inline">{user.name}</span>
//                 </button>
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
//                   <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                     Profile
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="hidden md:flex items-center space-x-4">
//                 <Link to="/login" className="text-gray-700 hover:text-orange-600">
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden"
//             >
//               {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <div className="flex flex-col space-y-4">
//               <Link to="/" className="text-gray-700 hover:text-orange-600">
//                 Home
//               </Link>
//               <Link to="/menu" className="text-gray-700 hover:text-orange-600">
//                 Menu
//               </Link>
//               {user ? (
//                 <>
//                   <Link to="/orders" className="text-gray-700 hover:text-orange-600">
//                     My Orders
//                   </Link>
//                   <Link to="/profile" className="text-gray-700 hover:text-orange-600">
//                     Profile
//                   </Link>
//                   {user.role === 'admin' && (
//                     <Link to="/admin" className="text-gray-700 hover:text-orange-600">
//                       Admin
//                     </Link>
//                   )}
//                   <button
//                     onClick={handleLogout}
//                     className="text-left text-gray-700 hover:text-orange-600"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/login" className="text-gray-700 hover:text-orange-600">
//                     Login
//                   </Link>
//                   <Link to="/register" className="text-gray-700 hover:text-orange-600">
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, Menu as MenuIcon, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-orange-600">
            FoodExpress
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-orange-600">
              Menu
            </Link>
              <Link to="/deals" className="text-gray-700 hover:text-orange-600">
    Deals
  </Link>
            {user && (
              <Link to="/orders" className="text-gray-700 hover:text-orange-600">
                My Orders
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <User className="h-6 w-6 text-gray-700" />
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-orange-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-orange-600">
                Home
              </Link>
              <Link to="/menu" className="text-gray-700 hover:text-orange-600">
                Menu
              </Link>
              {user ? (
                <>
                  <Link to="/orders" className="text-gray-700 hover:text-orange-600">
                    My Orders
                  </Link>
                  <Link to="/profile" className="text-gray-700 hover:text-orange-600">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-orange-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-orange-600">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-700 hover:text-orange-600">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;