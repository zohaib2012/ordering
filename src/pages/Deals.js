// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Tag, Clock, Filter, Search, Percent, ArrowLeft } from 'lucide-react';
// import DealCard from '../components/DealCard';
// import { dealsAPI } from '../utils/api';
// import LoadingSpinner from '../components/LoadingSpinner';
// import toast from 'react-hot-toast';

// const Deals = () => {
//   const [deals, setDeals] = useState([]);
//   const [filteredDeals, setFilteredDeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState('newest');

//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   useEffect(() => {
//     filterAndSortDeals();
//   }, [deals, search, sortBy]);

//   const fetchDeals = async () => {
//     try {
//       setLoading(true);
//       const response = await dealsAPI.getActiveDeals();
//       console.log(response)
//       setDeals(response.data || []);
//     } catch (error) {
//       console.error('Error fetching deals:', error);
//       toast.error('Failed to load deals');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterAndSortDeals = () => {
//     let result = [...deals];

//     // Filter active and non-expired deals
//     result = result.filter(deal => 
//       deal.isActive && new Date(deal.validTill) > new Date()
//     );

//     // Apply search filter
//     if (search) {
//       const searchLower = search.toLowerCase();
//       result = result.filter(deal => 
//         deal.title.toLowerCase().includes(searchLower) ||
//         deal.description.toLowerCase().includes(searchLower)
//       );
//     }

//     // Apply sorting
//     result.sort((a, b) => {
//       switch (sortBy) {
//         case 'newest':
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         case 'discount':
//           const discountA = ((a.originalPrice - a.dealPrice) / a.originalPrice) * 100;
//           const discountB = ((b.originalPrice - b.dealPrice) / b.originalPrice) * 100;
//           return discountB - discountA;
//         case 'price-low':
//           return a.dealPrice - b.dealPrice;
//         case 'price-high':
//           return b.dealPrice - a.dealPrice;
//         case 'expiring':
//           return new Date(a.validTill) - new Date(b.validTill);
//         default:
//           return 0;
//       }
//     });

//     setFilteredDeals(result);
//   };

//   const calculateTotalDiscount = () => {
//     return deals.reduce((total, deal) => {
//       const discount = ((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100;
//       return total + discount;
//     }, 0);
//   };

//   const calculateTotalSavings = () => {
//     return deals.reduce((total, deal) => {
//       return total + (deal.originalPrice - deal.dealPrice);
//     }, 0);
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <div className="flex justify-center items-center h-64">
//           <LoadingSpinner size="large" />
//         </div>
//       </div>
//     );
//   }

//   const activeDeals = deals.filter(deal => 
//     deal.isActive && new Date(deal.validTill) > new Date()
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <Link 
//           to="/" 
//           className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
//         >
//           <ArrowLeft className="h-5 w-5 mr-2" />
//           Back to Home
//         </Link>
        
//         <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <div className="flex items-center mb-2">
//                 <Tag className="h-8 w-8 mr-3" />
//                 <h1 className="text-3xl md:text-4xl font-bold">Special Offers & Deals</h1>
//               </div>
//               <p className="text-lg opacity-90">
//                 Limited time offers! Save big on your favorite meals
//               </p>
//             </div>
            
//             <div className="bg-white/20 p-4 rounded-xl">
//               <div className="text-center">
//                 <p className="text-2xl font-bold">{activeDeals.length}</p>
//                 <p className="text-sm">Active Deals</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-red-100 text-red-600 rounded-lg mr-4">
//               <Percent className="h-6 w-6" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Average Discount</p>
//               <p className="text-2xl font-bold">
//                 {activeDeals.length > 0 
//                   ? Math.round(calculateTotalDiscount() / activeDeals.length) + '%'
//                   : '0%'
//                 }
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
//               <Tag className="h-6 w-6" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Total Savings</p>
//               <p className="text-2xl font-bold">
//                 ${calculateTotalSavings().toFixed(2)}
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
//               <Clock className="h-6 w-6" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Expiring Soon</p>
//               <p className="text-2xl font-bold">
//                 {activeDeals.filter(deal => {
//                   const timeLeft = new Date(deal.validTill) - new Date();
//                   return timeLeft < 24 * 60 * 60 * 1000; // Within 24 hours
//                 }).length}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white rounded-xl shadow p-6 mb-8">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search deals..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
//               />
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center">
//               <Filter className="h-5 w-5 text-gray-400 mr-2" />
//               <span className="text-sm text-gray-600">Sort by:</span>
//             </div>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             >
//               <option value="newest">Newest First</option>
//               <option value="discount">Highest Discount</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="expiring">Expiring Soon</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Deals Grid */}
//       {filteredDeals.length === 0 ? (
//         <div className="bg-white rounded-xl shadow p-12 text-center">
//           <div className="text-6xl mb-4">🎁</div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-3">No Active Deals Found</h3>
//           <p className="text-gray-600 mb-6">
//             {search 
//               ? 'No deals match your search. Try different keywords.'
//               : 'Check back later for amazing deals and offers!'
//             }
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/menu"
//               className="btn-primary"
//             >
//               Browse Menu
//             </Link>
//             {search && (
//               <button
//                 onClick={() => setSearch('')}
//                 className="btn-secondary"
//               >
//                 Clear Search
//               </button>
//             )}
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {filteredDeals.map((deal) => (
//               <DealCard key={deal._id} deal={deal} />
//             ))}
//           </div>
          
//           <div className="text-center">
//             <p className="text-gray-600 mb-4">
//               Showing {filteredDeals.length} of {activeDeals.length} active deals
//             </p>
//             <Link
//               to="/menu"
//               className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-lg"
//             >
//               Browse Full Menu
//               <ArrowLeft className="ml-2 h-5 w-5 transform rotate-180" />
//             </Link>
//           </div>
//         </>
//       )}

//       {/* How to Use Deals */}
//       <div className="mt-12 bg-gray-50 rounded-2xl p-8">
//         <h2 className="text-2xl font-bold text-center mb-8">How to Use These Deals</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="text-center p-4">
//             <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-xl font-bold">1</span>
//             </div>
//             <h3 className="font-bold mb-2">Browse Deals</h3>
//             <p className="text-gray-600 text-sm">
//               Explore our special offers and choose your favorite deals
//             </p>
//           </div>
          
//           <div className="text-center p-4">
//             <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-xl font-bold">2</span>
//             </div>
//             <h3 className="font-bold mb-2">Add to Cart</h3>
//             <p className="text-gray-600 text-sm">
//               Click "Add to Cart" on any deal to apply the discount automatically
//             </p>
//           </div>
          
//           <div className="text-center p-4">
//             <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-xl font-bold">3</span>
//             </div>
//             <h3 className="font-bold mb-2">Checkout & Save</h3>
//             <p className="text-gray-600 text-sm">
//               Complete your order and enjoy your meal at discounted prices!
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Terms & Conditions */}
//       <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl">
//         <h3 className="font-bold mb-3">Terms & Conditions</h3>
//         <ul className="text-sm text-gray-600 space-y-2">
//           <li>• Deals are valid until the expiration date shown</li>
//           <li>• Only one deal can be applied per order</li>
//           <li>• Deals cannot be combined with other offers</li>
//           <li>• Prices are inclusive of all taxes</li>
//           <li>• Restaurant reserves the right to modify or cancel deals</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Deals;
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Tag, Clock, Filter, Search, Percent, ArrowLeft } from 'lucide-react';
// import DealCard from '../components/DealCard';
// import { dealsAPI } from '../utils/api';
// import LoadingSpinner from '../components/LoadingSpinner';
// import toast from 'react-hot-toast';

// const Deals = () => {
//   const [deals, setDeals] = useState([]);
//   const [filteredDeals, setFilteredDeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState('newest');

//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   useEffect(() => {
//     filterAndSortDeals();
//   }, [deals, search, sortBy]);

//   const fetchDeals = async () => {
//     try {
//       setLoading(true);
//       const response = await dealsAPI.getActiveDeals();
//       console.log('API Response:', response);
      
//       // Check if response.data exists and is an array
//       const dealsData = Array.isArray(response.data) ? response.data : [];
      
//       console.log('Setting deals:', dealsData);
//       console.log('Number of deals:', dealsData.length);
      
//       if (dealsData.length > 0) {
//         console.log('Sample deal:', dealsData[0]);
//       }
      
//       setDeals(dealsData);
//     } catch (error) {
//       console.error('Error fetching deals:', error);
//       toast.error('Failed to load deals');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterAndSortDeals = () => {
//     console.log('Starting filterAndSortDeals with deals:', deals.length);
    
//     // If no deals, set empty filtered array
//     if (!deals || deals.length === 0) {
//       console.log('No deals to filter');
//       setFilteredDeals([]);
//       return;
//     }

//     let result = [...deals];

//     console.log('Before filtering - total deals:', result.length);
    
//     // Filter active and non-expired deals
//     result = result.filter(deal => {
//       // Check if deal object exists
//       if (!deal) return false;
      
//       // Check if deal is active
//       const isActive = deal.isActive === true;
      
//       // Check if deal is not expired
//       const isValid = deal.validTill ? new Date(deal.validTill) > new Date() : true;
      
//       console.log(`Deal: ${deal.title}, isActive: ${isActive}, isValid: ${isValid}`);
      
//       return isActive && isValid;
//     });

//     console.log('After filtering - active deals:', result.length);
    
//     // Apply search filter
//     if (search.trim()) {
//       const searchLower = search.toLowerCase().trim();
//       result = result.filter(deal => {
//         const titleMatch = deal.title && deal.title.toLowerCase().includes(searchLower);
//         const descMatch = deal.description && deal.description.toLowerCase().includes(searchLower);
//         return titleMatch || descMatch;
//       });
//       console.log('After search - deals:', result.length);
//     }

//     // Apply sorting
//     result.sort((a, b) => {
//       switch (sortBy) {
//         case 'newest':
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         case 'discount':
//           const discountA = a.originalPrice && a.dealPrice ? 
//             ((a.originalPrice - a.dealPrice) / a.originalPrice) * 100 : 0;
//           const discountB = b.originalPrice && b.dealPrice ? 
//             ((b.originalPrice - b.dealPrice) / b.originalPrice) * 100 : 0;
//           return discountB - discountA;
//         case 'price-low':
//           return (a.dealPrice || 0) - (b.dealPrice || 0);
//         case 'price-high':
//           return (b.dealPrice || 0) - (a.dealPrice || 0);
//         case 'expiring':
//           const dateA = a.validTill ? new Date(a.validTill) : new Date('9999-12-31');
//           const dateB = b.validTill ? new Date(b.validTill) : new Date('9999-12-31');
//           return dateA - dateB;
//         default:
//           return 0;
//       }
//     });

//     console.log('Final filtered deals:', result);
//     setFilteredDeals(result);
//   };

//   const calculateTotalDiscount = () => {
//     const activeDeals = deals.filter(deal => 
//       deal.isActive && (!deal.validTill || new Date(deal.validTill) > new Date())
//     );
    
//     if (activeDeals.length === 0) return 0;
    
//     const totalDiscount = activeDeals.reduce((total, deal) => {
//       if (deal.originalPrice && deal.dealPrice && deal.originalPrice > 0) {
//         const discount = ((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100;
//         return total + discount;
//       }
//       return total;
//     }, 0);
    
//     return totalDiscount;
//   };

//   const calculateTotalSavings = () => {
//     const activeDeals = deals.filter(deal => 
//       deal.isActive && (!deal.validTill || new Date(deal.validTill) > new Date())
//     );
    
//     return activeDeals.reduce((total, deal) => {
//       if (deal.originalPrice && deal.dealPrice) {
//         return total + (deal.originalPrice - deal.dealPrice);
//       }
//       return total;
//     }, 0);
//   };

//   const getActiveDeals = () => {
//     return deals.filter(deal => 
//       deal.isActive && (!deal.validTill || new Date(deal.validTill) > new Date())
//     );
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <div className="flex justify-center items-center h-64">
//           <LoadingSpinner size="large" />
//         </div>
//       </div>
//     );
//   }

//   const activeDeals = getActiveDeals();
//   const averageDiscount = activeDeals.length > 0 
//     ? Math.round(calculateTotalDiscount() / activeDeals.length)
//     : 0;
//   const totalSavings = calculateTotalSavings();
//   const expiringSoon = activeDeals.filter(deal => {
//     if (!deal.validTill) return false;
//     const timeLeft = new Date(deal.validTill) - new Date();
//     return timeLeft < 24 * 60 * 60 * 1000; // Within 24 hours
//   }).length;

//   console.log('Rendering component - activeDeals:', activeDeals.length);
//   console.log('filteredDeals:', filteredDeals.length);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <Link 
//           to="/" 
//           className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
//         >
//           <ArrowLeft className="h-5 w-5 mr-2" />
//           Back to Home
//         </Link>
        
//         <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <div className="flex items-center mb-2">
//                 <Tag className="h-8 w-8 mr-3" />
//                 <h1 className="text-3xl md:text-4xl font-bold">Special Offers & Deals</h1>
//               </div>
//               <p className="text-lg opacity-90">
//                 Limited time offers! Save big on your favorite meals
//               </p>
//             </div>
            
//             <div className="bg-white/20 p-4 rounded-xl">
//               <div className="text-center">
//                 <p className="text-2xl font-bold">{activeDeals.length}</p>
//                 <p className="text-sm">Active Deals</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-red-100 text-red-600 rounded-lg mr-4">
//               <Percent className="h-6 w-6" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Average Discount</p>
//               <p className="text-2xl font-bold">
//                 {averageDiscount}%
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
//               <Tag className="h-6 w-6" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Total Savings</p>
//               <p className="text-2xl font-bold">
//                 ${totalSavings.toFixed(2)}
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
//               <Clock className="h-6 w-6" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Expiring Soon</p>
//               <p className="text-2xl font-bold">
//                 {expiringSoon}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white rounded-xl shadow p-6 mb-8">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search deals..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
//               />
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center">
//               <Filter className="h-5 w-5 text-gray-400 mr-2" />
//               <span className="text-sm text-gray-600">Sort by:</span>
//             </div>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             >
//               <option value="newest">Newest First</option>
//               <option value="discount">Highest Discount</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="expiring">Expiring Soon</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Deals Grid */}
//       {filteredDeals.length === 0 ? (
//         <div className="bg-white rounded-xl shadow p-12 text-center">
//           <div className="text-6xl mb-4">🎁</div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-3">
//             {activeDeals.length === 0 ? 'No Active Deals Available' : 'No Deals Match Your Search'}
//           </h3>
//           <p className="text-gray-600 mb-6">
//             {activeDeals.length === 0 
//               ? 'Check back later for amazing deals and offers!' 
//               : search 
//                 ? 'No deals match your search. Try different keywords.'
//                 : 'Check back later for amazing deals and offers!'
//             }
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/menu"
//               className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
//             >
//               Browse Menu
//             </Link>
//             {search && (
//               <button
//                 onClick={() => setSearch('')}
//                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//               >
//                 Clear Search
//               </button>
//             )}
//             {activeDeals.length > 0 && filteredDeals.length === 0 && !search && (
//               <button
//                 onClick={fetchDeals}
//                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//               >
//                 Refresh Deals
//               </button>
//             )}
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="mb-4">
//             <p className="text-gray-600">
//               Showing {filteredDeals.length} of {activeDeals.length} active deals
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {filteredDeals.map((deal) => (
//               <DealCard key={deal._id} deal={deal} />
//             ))}
//           </div>
          
//           <div className="text-center">
//             <Link
//               to="/menu"
//               className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-lg"
//             >
//               Browse Full Menu
//               <ArrowLeft className="ml-2 h-5 w-5 transform rotate-180" />
//             </Link>
//           </div>
//         </>
//       )}

//       {/* How to Use Deals */}
//       <div className="mt-12 bg-gray-50 rounded-2xl p-8">
//         <h2 className="text-2xl font-bold text-center mb-8">How to Use These Deals</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="text-center p-4">
//             <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-xl font-bold">1</span>
//             </div>
//             <h3 className="font-bold mb-2">Browse Deals</h3>
//             <p className="text-gray-600 text-sm">
//               Explore our special offers and choose your favorite deals
//             </p>
//           </div>
          
//           <div className="text-center p-4">
//             <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-xl font-bold">2</span>
//             </div>
//             <h3 className="font-bold mb-2">Add to Cart</h3>
//             <p className="text-gray-600 text-sm">
//               Click "Add to Cart" on any deal to apply the discount automatically
//             </p>
//           </div>
          
//           <div className="text-center p-4">
//             <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-xl font-bold">3</span>
//             </div>
//             <h3 className="font-bold mb-2">Checkout & Save</h3>
//             <p className="text-gray-600 text-sm">
//               Complete your order and enjoy your meal at discounted prices!
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Terms & Conditions */}
//       <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl">
//         <h3 className="font-bold mb-3">Terms & Conditions</h3>
//         <ul className="text-sm text-gray-600 space-y-2">
//           <li>• Deals are valid until the expiration date shown</li>
//           <li>• Only one deal can be applied per order</li>
//           <li>• Deals cannot be combined with other offers</li>
//           <li>• Prices are inclusive of all taxes</li>
//           <li>• Restaurant reserves the right to modify or cancel deals</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Deals;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Clock, Filter, Search, Percent, ArrowLeft } from 'lucide-react';
import DealCard from '../components/DealCard';
import { dealsAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    filterAndSortDeals();
  }, [deals, search, sortBy]);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      console.log('Fetching deals...');
      
      // DIRECT API CALL - Koi checking nahi
      const response = await dealsAPI.getActiveDeals();
      console.log('Raw API response:', response);
      console.log('Response type:', typeof response);
      console.log('Is array?', Array.isArray(response));
      
      // Debug - Check all possible structures
      console.log('response.data:', response?.data);
      console.log('response.deals:', response?.deals);
      console.log('response.results:', response?.results);
      
      // Solution 1: Direct assignment
      let dealsData = response;
      
      // Solution 2: If response has .data property
      if (response && response.data !== undefined) {
        console.log('Using response.data');
        dealsData = response.data;
      }
      
      // Solution 3: If response has .deals property
      if (response && response.deals !== undefined) {
        console.log('Using response.deals');
        dealsData = response.deals;
      }
      
      // Final check - ensure it's an array
      if (!Array.isArray(dealsData)) {
        console.log('dealsData is not array, converting...');
        // If it's an object, try to extract array
        if (dealsData && typeof dealsData === 'object') {
          // Check if any property contains array
          const keys = Object.keys(dealsData);
          for (const key of keys) {
            if (Array.isArray(dealsData[key])) {
              console.log(`Found array in property: ${key}`);
              dealsData = dealsData[key];
              break;
            }
          }
        }
      }
      
      console.log('Final dealsData:', dealsData);
      console.log('Final dealsData length:', Array.isArray(dealsData) ? dealsData.length : 'Not an array');
      
      setDeals(Array.isArray(dealsData) ? dealsData : []);
      
    } catch (error) {
      console.error('Error fetching deals:', error);
      console.error('Error details:', error.response || error.message);
      toast.error('Failed to load deals');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortDeals = () => {
    console.log('filterAndSortDeals called with deals:', deals);
    console.log('deals array:', deals);
    console.log('deals length:', deals.length);
    
    if (!deals || deals.length === 0) {
      console.log('No deals to process');
      setFilteredDeals([]);
      return;
    }

    let result = [...deals];
    console.log('Starting with result:', result.length);

    // Basic filter - only active deals
    result = result.filter(deal => {
      if (!deal) return false;
      const isActive = deal.isActive === true;
      const isValid = deal.validTill ? new Date(deal.validTill) > new Date() : true;
      return isActive && isValid;
    });

    console.log('After basic filter:', result.length);

    // Search
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      result = result.filter(deal => {
        const titleMatch = deal.title?.toLowerCase().includes(searchLower);
        const descMatch = deal.description?.toLowerCase().includes(searchLower);
        return titleMatch || descMatch;
      });
      console.log('After search:', result.length);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'discount':
          const discountA = a.originalPrice && a.dealPrice ? 
            ((a.originalPrice - a.dealPrice) / a.originalPrice) * 100 : 0;
          const discountB = b.originalPrice && b.dealPrice ? 
            ((b.originalPrice - b.dealPrice) / b.originalPrice) * 100 : 0;
          return discountB - discountA;
        case 'price-low':
          return (a.dealPrice || 0) - (b.dealPrice || 0);
        case 'price-high':
          return (b.dealPrice || 0) - (a.dealPrice || 0);
        case 'expiring':
          const dateA = a.validTill ? new Date(a.validTill) : new Date('9999-12-31');
          const dateB = b.validTill ? new Date(b.validTill) : new Date('9999-12-31');
          return dateA - dateB;
        default:
          return 0;
      }
    });

    console.log('Final result to set:', result);
    setFilteredDeals(result);
  };

  const calculateTotalDiscount = () => {
    if (!deals.length) return 0;
    
    const activeDeals = deals.filter(deal => 
      deal.isActive && (!deal.validTill || new Date(deal.validTill) > new Date())
    );
    
    if (activeDeals.length === 0) return 0;
    
    const totalDiscount = activeDeals.reduce((total, deal) => {
      if (deal.originalPrice && deal.dealPrice && deal.originalPrice > 0) {
        const discount = ((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100;
        return total + discount;
      }
      return total;
    }, 0);
    
    return totalDiscount;
  };

  const calculateTotalSavings = () => {
    if (!deals.length) return 0;
    
    const activeDeals = deals.filter(deal => 
      deal.isActive && (!deal.validTill || new Date(deal.validTill) > new Date())
    );
    
    return activeDeals.reduce((total, deal) => {
      if (deal.originalPrice && deal.dealPrice) {
        return total + (deal.originalPrice - deal.dealPrice);
      }
      return total;
    }, 0);
  };

  const getActiveDeals = () => {
    return deals.filter(deal => 
      deal.isActive && (!deal.validTill || new Date(deal.validTill) > new Date())
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
          <span className="ml-4">Loading deals...</span>
        </div>
      </div>
    );
  }

  const activeDeals = getActiveDeals();
  const averageDiscount = activeDeals.length > 0 
    ? Math.round(calculateTotalDiscount() / activeDeals.length)
    : 0;
  const totalSavings = calculateTotalSavings();
  const expiringSoon = activeDeals.filter(deal => {
    if (!deal.validTill) return false;
    const timeLeft = new Date(deal.validTill) - new Date();
    return timeLeft < 24 * 60 * 60 * 1000;
  }).length;

  console.log('=== RENDERING ===');
  console.log('deals state:', deals);
  console.log('deals length:', deals.length);
  console.log('activeDeals:', activeDeals.length);
  console.log('filteredDeals:', filteredDeals.length);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Debug Info - Temporary */}
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Debug:</strong> Deals in state: {deals.length} | 
          Active deals: {activeDeals.length} | 
          Filtered deals: {filteredDeals.length}
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center mb-2">
                <Tag className="h-8 w-8 mr-3" />
                <h1 className="text-3xl md:text-4xl font-bold">Special Offers & Deals</h1>
              </div>
              <p className="text-lg opacity-90">
                Limited time offers! Save big on your favorite meals
              </p>
            </div>
            
            <div className="bg-white/20 p-4 rounded-xl">
              <div className="text-center">
                <p className="text-2xl font-bold">{activeDeals.length}</p>
                <p className="text-sm">Active Deals</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg mr-4">
              <Percent className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Discount</p>
              <p className="text-2xl font-bold">
                {averageDiscount}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
              <Tag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Savings</p>
              <p className="text-2xl font-bold">
                ${totalSavings.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Expiring Soon</p>
              <p className="text-2xl font-bold">
                {expiringSoon}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search deals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="expiring">Expiring Soon</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      {filteredDeals.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {activeDeals.length === 0 ? 'No Active Deals Available' : 'No Deals Match Your Search'}
          </h3>
          <p className="text-gray-600 mb-6">
            {activeDeals.length === 0 
              ? 'Check back later for amazing deals and offers!' 
              : search 
                ? 'No deals match your search. Try different keywords.'
                : 'Check back later for amazing deals and offers!'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Browse Menu
            </Link>
            <button
              onClick={fetchDeals}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Refresh
            </button>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredDeals.length} of {activeDeals.length} active deals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredDeals.map((deal) => (
              <DealCard key={deal._id} deal={deal} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/menu"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-lg"
            >
              Browse Full Menu
              <ArrowLeft className="ml-2 h-5 w-5 transform rotate-180" />
            </Link>
          </div>
        </>
      )}

      {/* How to Use Deals */}
      <div className="mt-12 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">How to Use These Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="font-bold mb-2">Browse Deals</h3>
            <p className="text-gray-600 text-sm">
              Explore our special offers and choose your favorite deals
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="font-bold mb-2">Add to Cart</h3>
            <p className="text-gray-600 text-sm">
              Click "Add to Cart" on any deal to apply the discount automatically
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="font-bold mb-2">Checkout & Save</h3>
            <p className="text-gray-600 text-sm">
              Complete your order and enjoy your meal at discounted prices!
            </p>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl">
        <h3 className="font-bold mb-3">Terms & Conditions</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Deals are valid until the expiration date shown</li>
          <li>• Only one deal can be applied per order</li>
          <li>• Deals cannot be combined with other offers</li>
          <li>• Prices are inclusive of all taxes</li>
          <li>• Restaurant reserves the right to modify or cancel deals</li>
        </ul>
      </div>
    </div>
  );
};

export default Deals;