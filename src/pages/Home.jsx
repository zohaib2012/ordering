

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ArrowRight } from 'lucide-react';

// const Home = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading
//     setTimeout(() => setLoading(false), 500);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-8 md:p-12">
//         <div className="max-w-2xl">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Delicious Food Delivered to Your Doorstep
//           </h1>
//           <p className="text-xl mb-8">
//             Order from our wide selection of mouth-watering dishes
//           </p>
//           <Link
//             to="/menu"
//             className="inline-flex items-center bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//           >
//             Order Now
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </Link>
//         </div>
//       </div>

//       {/* Categories Preview */}
//       <section>
//         <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {['Pizza', 'Burger', 'Pasta', 'Dessert'].map((category) => (
//             <Link
//               key={category}
//               to="/menu"
//               className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow"
//             >
//               <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
//                 <span className="text-2xl">🍕</span>
//               </div>
//               <h3 className="font-medium">{category}</h3>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <div className="bg-gray-900 text-white rounded-xl p-8">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Ready to Order?</h2>
//           <p className="mb-6">Browse our menu and order your favorite food online</p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/menu"
//               className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
//             >
//               View Full Menu
//             </Link>
//             <Link
//               to="/register"
//               className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
//             >
//               Create Account
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Clock, Tag } from 'lucide-react';
// import MenuItemCard from '../components/MenuItemCard';
// import DealCard from '../components/DealCard'; // New component
// import { menuAPI, dealsAPI } from '../utils/api';
// import LoadingSpinner from '../components/LoadingSpinner';

// const Home = () => {
//   const [categories, setCategories] = useState([]);
//   const [topSelling, setTopSelling] = useState([]);
//   const [deals, setDeals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [categoriesRes, topSellingRes, dealsRes] = await Promise.all([
//         menuAPI.getCategories(),
//         menuAPI.getTopSelling(),
//         dealsAPI.getActiveDeals()
//       ]);
      
//       setCategories(categoriesRes.data);
//       setTopSelling(topSellingRes.data);
//       setDeals(dealsRes.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <LoadingSpinner size="large" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-12">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl overflow-hidden">
//         <div className="absolute inset-0 bg-black opacity-20"></div>
//         <div className="relative container mx-auto px-4 py-20 md:py-32">
//           <div className="max-w-2xl">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4">
//               Delicious Food Delivered to Your Doorstep
//             </h1>
//             <p className="text-xl mb-8 opacity-90">
//               Order from our wide selection of mouth-watering dishes
//             </p>
//             <Link
//               to="/menu"
//               className="inline-flex items-center bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//             >
//               Order Now
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Special Deals Section */}
//       {deals.length > 0 && (
        
//         <section>
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center">
//               <Tag className="h-6 w-6 text-red-500 mr-2" />
//               <h2 className="text-2xl font-bold">Special Offers & Deals</h2>
//             </div>
//             <Link to="/menu" className="text-orange-600 hover:text-orange-700 flex items-center">
//               View All
//               <ArrowRight className="ml-1 h-4 w-4" />
//             </Link>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {deals.slice(0, 3).map((deal) => (
//               <DealCard key={deal._id} deal={deal} />
//             ))}
//           </div>
          
//           {deals.length > 3 && (
//             <div className="mt-6 text-center">
//               <Link
//                 to="/deals"
//                 className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
//               >
//                 View All {deals.length} Deals
//                 <ArrowRight className="ml-1 h-4 w-4" />
//               </Link>
//             </div>
//           )}
//         </section>
//       )}

//       {/* Categories */}
//       <section>
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Categories</h2>
//           <Link to="/menu" className="text-orange-600 hover:text-orange-700 flex items-center">
//             View All
//             <ArrowRight className="ml-1 h-4 w-4" />
//           </Link>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {categories.map((category) => (
//             <Link
//               key={category._id}
//               to={`/menu?category=${category._id}`}
//               className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow"
//             >
//               <div className="w-16 h-16 mx-auto mb-2">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               </div>
//               <h3 className="font-medium">{category.name}</h3>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Top Selling */}
//       <section>
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Top Selling Items</h2>
//           <Link to="/menu" className="text-orange-600 hover:text-orange-700 flex items-center">
//             View All
//             <ArrowRight className="ml-1 h-4 w-4" />
//           </Link>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {topSelling.map((item) => (
//             <MenuItemCard key={item._id} item={item} />
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8 md:p-12">
//         <div className="text-center max-w-3xl mx-auto">
//           <h2 className="text-3xl font-bold mb-4">Hungry? Order Now!</h2>
//           <p className="text-xl mb-8 opacity-90">
//             Get your favorite food delivered in minutes. Fresh, hot, and delicious!
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/menu"
//               className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
//             >
//               Order Food
//             </Link>
//             <Link
//               to="/deals"
//               className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
//             >
//               View Deals
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
// export default Home;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import MenuItemCard from '../components/MenuItemCard';
import DealCard from '../components/DealCard'; // New component
import { menuAPI, dealsAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [deals, setDeals] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, topSellingRes, dealsRes] = await Promise.all([
        menuAPI.getCategories(),
        menuAPI.getTopSelling(),
        dealsAPI.getActiveDeals()
      ]);
      
      setCategories(categoriesRes?.data || []);
      setTopSelling(topSellingRes?.data || []);
      setDeals(dealsRes?.data || []); // Handle undefined response
    } catch (error) {
      console.error('Error fetching data:', error);
      // Ensure states are set to empty arrays on error
      setCategories([]);
      setTopSelling([]);
      setDeals([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Delicious Food Delivered to Your Doorstep
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Order from our wide selection of mouth-watering dishes
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Order Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Deals Section - FIXED: Use optional chaining */}
      {deals?.length > 0 && ( // CHANGED: deals.length to deals?.length
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Tag className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-2xl font-bold">Special Offers & Deals</h2>
            </div>
            <Link to="/menu" className="text-orange-600 hover:text-orange-700 flex items-center">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.slice(0, 3).map((deal) => (
              <DealCard key={deal._id} deal={deal} />
            ))}
          </div>
          
          {deals.length > 3 && ( // This line should also have optional chaining
            <div className="mt-6 text-center">
              <Link
                to="/deals"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
              >
                View All {deals.length} Deals
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Categories */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Link to="/menu" className="text-orange-600 hover:text-orange-700 flex items-center">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories?.map((category) => ( // Added optional chaining here too
            <Link
              key={category._id}
              to={`/menu?category=${category._id}`}
              className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="font-medium">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Selling */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Top Selling Items</h2>
          <Link to="/menu" className="text-orange-600 hover:text-orange-700 flex items-center">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topSelling?.map((item) => ( // Added optional chaining
            <MenuItemCard key={item._id} item={item} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8 md:p-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Hungry? Order Now!</h2>
          <p className="text-xl mb-8 opacity-90">
            Get your favorite food delivered in minutes. Fresh, hot, and delicious!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Order Food
            </Link>
            <Link
              to="/deals"
              className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              View Deals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;