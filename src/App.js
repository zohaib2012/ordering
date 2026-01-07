// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { Toaster } from 'react-hot-toast';
// // import { AuthProvider } from './context/AuthContext';
// // import { CartProvider } from './context/CartContext';

// // // Layout Components
// // import MainLayout from './layouts/MainLayout';
// // import AdminLayout from './layouts/AdminLayout';

// // // Customer Pages
// // import Home from './pages/Home';
// // import Menu from './pages/Menu';
// // import Cart from './pages/Cart';
// // import Checkout from './pages/Checkout';
// // import Orders from './pages/Orders';
// // import Profile from './pages/Profile';
// // import Login from './pages/Login';
// // import Register from './pages/Register';

// // // Admin Pages
// // import AdminDashboard from './pages/admin/Dashboard';
// // import AdminMenu from './pages/admin/Menu';
// // import AdminCategories from './pages/admin/Categories';
// // import AdminOrders from './pages/admin/Orders';
// // import AdminReports from './pages/admin/Reports';

// // // Protected Route Component
// // const ProtectedRoute = ({ children, requireAdmin = false }) => {
// //   const token = localStorage.getItem('token');
// //   const user = JSON.parse(localStorage.getItem('user') || '{}');
  
// //   if (!token) {
// //     return <Navigate to="/login" />;
// //   }
  
// //   if (requireAdmin && user.role !== 'admin') {
// //     return <Navigate to="/" />;
// //   }
  
// //   return children;
// // };

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <CartProvider>
// //         <Router>
// //           <Toaster position="top-right" />
// //           <Routes>
// //             {/* Customer Routes */}
// //             <Route path="/" element={<MainLayout />}>
// //               <Route index element={<Home />} />
// //               <Route path="menu" element={<Menu />} />
// //               <Route path="cart" element={<Cart />} />
// //               <Route path="checkout" element={
// //                 <ProtectedRoute>
// //                   <Checkout />
// //                 </ProtectedRoute>
// //               } />
// //               <Route path="orders" element={
// //                 <ProtectedRoute>
// //                   <Orders />
// //                 </ProtectedRoute>
// //               } />
// //               <Route path="profile" element={
// //                 <ProtectedRoute>
// //                   <Profile />
// //                 </ProtectedRoute>
// //               } />
// //               <Route path="login" element={<Login />} />
// //               <Route path="register" element={<Register />} />
// //             </Route>

// //             {/* Admin Routes */}
// //             <Route path="/admin" element={
// //               <ProtectedRoute requireAdmin>
// //                 <AdminLayout />
// //               </ProtectedRoute>
// //             }>
// //               <Route index element={<AdminDashboard />} />
// //               <Route path="menu" element={<AdminMenu />} />
// //               <Route path="categories" element={<AdminCategories />} />
// //               <Route path="orders" element={<AdminOrders />} />
// //               <Route path="reports" element={<AdminReports />} />
// //             </Route>
// //           </Routes>
// //         </Router>
// //       </CartProvider>
// //     </AuthProvider>
// //   );
// // }

// // export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';

// // Layout Components
// import MainLayout from './layouts/MainLayout';
// import AdminLayout from './layouts/AdminLayout';

// // Customer Pages
// // import Home from './pages/Home';
// import Home from './pages/Home';
// import Menu from './pages/Menu';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import Orders from './pages/Orders';
// import Profile from './pages/Profile';
// import Login from './pages/Login';
// import Register from './pages/Register';

// // Admin Pages
// import AdminDashboard from './pages/admin/Dashboard';
// import AdminMenu from './pages/admin/Menu';
// import AdminCategories from './pages/admin/Categories';
// import AdminOrders from './pages/admin/Orders';
// import AdminReports from './pages/admin/Reports';


// // Protected Route Component
// const ProtectedRoute = ({ children, requireAdmin = false }) => {
//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
  
//   if (!token) {
//     return <Navigate to="/login" />;
//   }
  
//   if (requireAdmin && user.role !== 'admin') {
//     return <Navigate to="/" />;
//   }
  
//   return children;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <Router>
//           <Toaster 
//             position="top-right"
//             toastOptions={{
//               duration: 4000,
//               style: {
//                 background: '#363636',
//                 color: '#fff',
//               },
//               success: {
//                 duration: 3000,
//                 theme: {
//                   primary: 'green',
//                   secondary: 'black',
//                 },
//               },
//               error: {
//                 duration: 4000,
//               },
//             }}
//           />
//           <Routes>
//             {/* Customer Routes */}
//             <Route path="/" element={<MainLayout />}>
//               <Route index element={<Home />} />
//               <Route path="menu" element={<Menu />} />
//               <Route path="cart" element={<Cart />} />
//               <Route path="checkout" element={
//                 <ProtectedRoute>
//                   <Checkout />
//                 </ProtectedRoute>
//               } />
//               <Route path="orders" element={
//                 <ProtectedRoute>
//                   <Orders />
//                 </ProtectedRoute>
//               } />
//               <Route path="profile" element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               } />
//               <Route path="login" element={<Login />} />
//               <Route path="register" element={<Register />} />
//             </Route>

//             {/* Admin Routes */}
//             <Route path="/admin" element={
//               <ProtectedRoute requireAdmin>
//                 <AdminLayout />
//               </ProtectedRoute>
//             }>
//               <Route index element={<AdminDashboard />} />
//               <Route path="menu" element={<AdminMenu />} />
//               <Route path="categories" element={<AdminCategories />} />
//               <Route path="orders" element={<AdminOrders />} />
//               <Route path="reports" element={<AdminReports />} />
//             </Route>
//           </Routes>
//         </Router>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';

// Layout Components
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Customer Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import  AdminMenu  from './pages/admin/Menu';
import AdminCategories from './pages/admin/Categories';
import AdminOrders from './pages/admin/Orders';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';
import OrderDetails from './pages/OrderDetails';
import AdminDeals from './pages/admin/Deal';
import Deals from './pages/Deals';

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  theme: {
                    primary: 'green',
                    secondary: 'black',
                  },
                },
                error: {
                  duration: 4000,
                },
              }}
            />
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                {/* <Route path="deals" element={<AdminDeals />} /> */}

<Route path="deals" element={<Deals />} />

                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="orders/:id" element={
  <ProtectedRoute>
    <OrderDetails />
  </ProtectedRoute>
} />
                <Route path="profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>




              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }>
            
                <Route index element={<AdminDashboard />} />
                <Route path="menu" element={<AdminMenu />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="reports" element={<AdminReports />} />
                
<Route path="deals" element={<AdminDeals />} />

                 <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;