// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, 
//   Edit, 
//   Trash2, 
//   Eye, 
//   Filter, 
//   Search, 
//   Tag, 
//   Calendar,
//   Clock,
//   TrendingUp,
//   Percent,
//   RefreshCw,
//   CheckCircle,
//   XCircle
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import LoadingSpinner from '../../components/LoadingSpinner';

// const AdminDeals = () => {
//   const [deals, setDeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [showForm, setShowForm] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentDealId, setCurrentDealId] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     originalPrice: '',
//     dealPrice: '',
//     validTill: '',
//     isActive: true,
//     image: null
//   });
//   const [imagePreview, setImagePreview] = useState('');

//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = async () => {
//     try {
//       setLoading(true);
//       // Simulate API call - Replace with actual API
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Mock data - Replace with actual API response
//       const mockDeals = [
//         {
//           _id: '1',
//           title: 'Weekend Special',
//           description: 'Get 30% off on all pizzas',
//           originalPrice: 49.99,
//           dealPrice: 34.99,
//           image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
//           validTill: '2024-12-31T23:59:59',
//           isActive: true,
//           createdAt: new Date().toISOString()
//         },
//         {
//           _id: '2',
//           title: 'Combo Deal',
//           description: 'Burger + Fries + Drink',
//           originalPrice: 19.99,
//           dealPrice: 14.99,
//           image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
//           validTill: '2024-11-30T23:59:59',
//           isActive: true,
//           createdAt: new Date().toISOString()
//         },
//         {
//           _id: '3',
//           title: 'Family Pack',
//           description: '4 Large Pizzas + 4 Drinks',
//           originalPrice: 79.99,
//           dealPrice: 59.99,
//           image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
//           validTill: '2024-10-31T23:59:59',
//           isActive: false,
//           createdAt: new Date().toISOString()
//         }
//       ];
      
//       setDeals(mockDeals);
//     } catch (error) {
//       console.error('Error fetching deals:', error);
//       toast.error('Failed to load deals');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteDeal = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this deal?')) return;
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 500));
//       setDeals(prev => prev.filter(deal => deal._id !== id));
//       toast.success('Deal deleted successfully');
//     } catch (error) {
//       toast.error('Failed to delete deal');
//     }
//   };

//   const handleEdit = (deal) => {
//     setEditMode(true);
//     setCurrentDealId(deal._id);
//     setFormData({
//       title: deal.title,
//       description: deal.description,
//       originalPrice: deal.originalPrice,
//       dealPrice: deal.dealPrice,
//       validTill: deal.validTill.split('T')[0],
//       isActive: deal.isActive,
//       image: null
//     });
//     setImagePreview(deal.image);
//     setShowForm(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, image: file }));
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.title || !formData.description || !formData.originalPrice || !formData.dealPrice || !formData.validTill) {
//       toast.error('Please fill all required fields');
//       return;
//     }

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const newDeal = {
//         _id: editMode ? currentDealId : String(Date.now()),
//         ...formData,
//         originalPrice: parseFloat(formData.originalPrice),
//         dealPrice: parseFloat(formData.dealPrice),
//         image: imagePreview || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
//         createdAt: new Date().toISOString()
//       };

//       if (editMode) {
//         setDeals(prev => prev.map(deal => deal._id === currentDealId ? newDeal : deal));
//         toast.success('Deal updated successfully');
//       } else {
//         setDeals(prev => [newDeal, ...prev]);
//         toast.success('Deal created successfully');
//       }

//       resetForm();
//     } catch (error) {
//       console.error('Error saving deal:', error);
//       toast.error('Failed to save deal');
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       description: '',
//       originalPrice: '',
//       dealPrice: '',
//       validTill: '',
//       isActive: true,
//       image: null
//     });
//     setImagePreview('');
//     setEditMode(false);
//     setCurrentDealId(null);
//     setShowForm(false);
//   };

//   const toggleDealStatus = async (deal) => {
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       const updatedDeals = deals.map(d => 
//         d._id === deal._id ? { ...d, isActive: !d.isActive } : d
//       );
//       setDeals(updatedDeals);
//       toast.success(`Deal ${!deal.isActive ? 'activated' : 'deactivated'}`);
//     } catch (error) {
//       toast.error('Failed to update deal status');
//     }
//   };

//   const calculateDiscount = (original, deal) => {
//     return Math.round(((original - deal) / original) * 100);
//   };

//   const isDealExpired = (validTill) => {
//     return new Date(validTill) < new Date();
//   };

//   const filteredDeals = deals.filter(deal => {
//     if (filter === 'active' && !deal.isActive) return false;
//     if (filter === 'inactive' && deal.isActive) return false;
//     if (filter === 'expired' && !isDealExpired(deal.validTill)) return false;
//     if (search && !deal.title.toLowerCase().includes(search.toLowerCase())) return false;
//     return true;
//   });

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Deals Management</h1>
//           <p className="text-gray-600">Create and manage special offers</p>
//         </div>
        
//         <div className="flex items-center space-x-3">
//           <button
//             onClick={fetchDeals}
//             className="p-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//             title="Refresh"
//           >
//             <RefreshCw className="h-5 w-5" />
//           </button>
//           <button
//             onClick={() => setShowForm(true)}
//             className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
//           >
//             <Plus className="h-5 w-5 mr-2" />
//             Create Deal
//           </button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Total Deals</p>
//               <p className="text-2xl font-bold mt-2">{deals.length}</p>
//             </div>
//             <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
//               <Tag className="h-6 w-6" />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Active Deals</p>
//               <p className="text-2xl font-bold mt-2">
//                 {deals.filter(d => d.isActive).length}
//               </p>
//             </div>
//             <div className="p-3 bg-green-100 text-green-600 rounded-lg">
//               <TrendingUp className="h-6 w-6" />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Avg Discount</p>
//               <p className="text-2xl font-bold mt-2">
//                 {deals.length > 0 
//                   ? Math.round(deals.reduce((sum, deal) => 
//                       sum + calculateDiscount(deal.originalPrice, deal.dealPrice), 0) / deals.length
//                     ) + '%'
//                   : '0%'
//                 }
//               </p>
//             </div>
//             <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
//               <Percent className="h-6 w-6" />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Expired Deals</p>
//               <p className="text-2xl font-bold mt-2">
//                 {deals.filter(d => isDealExpired(d.validTill)).length}
//               </p>
//             </div>
//             <div className="p-3 bg-red-100 text-red-600 rounded-lg">
//               <Clock className="h-6 w-6" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow p-6">
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
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             >
//               <option value="all">All Deals</option>
//               <option value="active">Active Only</option>
//               <option value="inactive">Inactive Only</option>
//               <option value="expired">Expired Only</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Deals Grid */}
//       {loading ? (
//         <div className="flex justify-center py-12">
//           <LoadingSpinner size="large" />
//         </div>
//       ) : filteredDeals.length === 0 ? (
//         <div className="bg-white rounded-lg shadow p-8 text-center">
//           <div className="text-6xl mb-4">🎁</div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
//           <p className="text-gray-600 mb-6">
//             {search || filter !== 'all' 
//               ? 'Try changing your search or filter criteria' 
//               : 'Start by creating your first deal'
//             }
//           </p>
//           <button
//             onClick={() => setShowForm(true)}
//             className="btn-primary"
//           >
//             <Plus className="h-5 w-5 mr-2 inline" />
//             Create First Deal
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredDeals.map(deal => {
//             const discount = calculateDiscount(deal.originalPrice, deal.dealPrice);
//             const expired = isDealExpired(deal.validTill);
            
//             return (
//               <div key={deal._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
//                 {/* Deal Image */}
//                 <div className="h-48 relative overflow-hidden">
//                   <img
//                     src={deal.image}
//                     alt={deal.title}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                   />
//                   <div className="absolute top-2 right-2 flex space-x-1">
//                     <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
//                       {discount}% OFF
//                     </span>
//                     {!deal.isActive && (
//                       <span className="px-2 py-1 bg-gray-500 text-white text-xs font-bold rounded">
//                         Inactive
//                       </span>
//                     )}
//                     {expired && (
//                       <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
//                         Expired
//                       </span>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Deal Info */}
//                 <div className="p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-lg">{deal.title}</h3>
//                     <div className="text-right">
//                       <p className="text-lg font-bold text-red-600">${deal.dealPrice}</p>
//                       <p className="text-sm text-gray-500 line-through">${deal.originalPrice}</p>
//                     </div>
//                   </div>
                  
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">{deal.description}</p>
                  
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center text-sm text-gray-500">
//                       <Calendar className="h-4 w-4 mr-1" />
//                       <span>Valid till: {formatDate(deal.validTill)}</span>
//                     </div>
//                     <span className={`text-xs px-2 py-1 rounded-full ${
//                       deal.isActive && !expired 
//                         ? 'bg-green-100 text-green-800' 
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {deal.isActive && !expired ? 'Active' : expired ? 'Expired' : 'Inactive'}
//                     </span>
//                   </div>
                  
//                   {/* Actions */}
//                   <div className="flex items-center justify-between pt-3 border-t">
//                     <button
//                       onClick={() => toggleDealStatus(deal)}
//                       className={`text-sm px-3 py-1 rounded ${
//                         deal.isActive
//                           ? 'bg-red-50 text-red-600 hover:bg-red-100'
//                           : 'bg-green-50 text-green-600 hover:bg-green-100'
//                       }`}
//                     >
//                       {deal.isActive ? 'Deactivate' : 'Activate'}
//                     </button>
                    
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => handleEdit(deal)}
//                         className="p-2 text-blue-600 hover:text-blue-800 bg-blue-50 rounded-lg hover:bg-blue-100"
//                         title="Edit"
//                       >
//                         <Edit className="h-4 w-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteDeal(deal._id)}
//                         className="p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-lg hover:bg-red-100"
//                         title="Delete"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Deal Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">
//                   {editMode ? 'Edit Deal' : 'Create New Deal'}
//                 </h2>
//                 <button
//                   onClick={resetForm}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Deal Title *
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     placeholder="e.g., Weekend Special, Combo Deal"
//                     required
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description *
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32"
//                     placeholder="Describe the deal and its benefits..."
//                     required
//                   />
//                 </div>

//                 {/* Prices */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Original Price ($) *
//                     </label>
//                     <input
//                       type="number"
//                       name="originalPrice"
//                       value={formData.originalPrice}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                       placeholder="49.99"
//                       step="0.01"
//                       min="0"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Deal Price ($) *
//                     </label>
//                     <input
//                       type="number"
//                       name="dealPrice"
//                       value={formData.dealPrice}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                       placeholder="34.99"
//                       step="0.01"
//                       min="0"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Discount Preview */}
//                 {formData.originalPrice && formData.dealPrice && (
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-600">Discount:</span>
//                       <span className="text-lg font-bold text-red-600">
//                         {calculateDiscount(parseFloat(formData.originalPrice), parseFloat(formData.dealPrice))}% OFF
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between mt-1">
//                       <span className="text-sm text-gray-600">You save:</span>
//                       <span className="font-medium">
//                         ${(parseFloat(formData.originalPrice) - parseFloat(formData.dealPrice)).toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Valid Till */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Valid Till *
//                   </label>
//                   <input
//                     type="date"
//                     name="validTill"
//                     value={formData.validTill}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     required
//                   />
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Deal Image *
//                   </label>
//                   <div className="space-y-4">
//                     {imagePreview && (
//                       <div className="relative h-48 rounded-lg overflow-hidden">
//                         <img
//                           src={imagePreview}
//                           alt="Preview"
//                           className="w-full h-full object-cover"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setImagePreview('');
//                             setFormData(prev => ({ ...prev, image: null }));
//                           }}
//                           className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
//                         >
//                           <XCircle className="h-4 w-4" />
//                         </button>
//                       </div>
//                     )}
                    
//                     <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
//                       imagePreview ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
//                     }`}>
//                       <input
//                         type="file"
//                         id="deal-image-upload"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="hidden"
//                       />
//                       <label htmlFor="deal-image-upload" className="cursor-pointer">
//                         <div className="space-y-2">
//                           <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
//                             <Tag className="h-6 w-6 text-gray-600" />
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium">
//                               {imagePreview ? 'Change Image' : 'Upload Image'}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               JPG, PNG or WEBP (max. 5MB)
//                             </p>
//                           </div>
//                         </div>
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="isActive"
//                     name="isActive"
//                     checked={formData.isActive}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
//                   />
//                   <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
//                     Active Deal (visible to customers)
//                   </label>
//                 </div>

//                 {/* Form Actions */}
//                 <div className="flex space-x-3 pt-4 border-t">
//                   <button
//                     type="button"
//                     onClick={resetForm}
//                     className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
//                   >
//                     {editMode ? 'Update Deal' : 'Create Deal'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDeals;
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Filter, 
  Search, 
  Tag, 
  Calendar,
  Clock,
  TrendingUp,
  Percent,
  RefreshCw,
  XCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import { dealsAPI } from '../../utils/api';

const AdminDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDealId, setCurrentDealId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    originalPrice: '',
    dealPrice: '',
    validTill: '',
    isActive: true,
    image: null
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      console.log('Fetching deals from API...');
      
      const response = await dealsAPI.getAllDeals();
      console.log('API Response:', response);
      
      if (response && response.data && Array.isArray(response.data)) {
        console.log('Setting deals:', response.data);
        setDeals(response.data);
      } else if (Array.isArray(response)) {
        console.log('Setting deals (direct array):', response);
        setDeals(response);
      } else {
        console.error('Invalid API response:', response);
        toast.error('Invalid data received from server');
        setDeals([]);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
      toast.error('Failed to load deals. Please try again.');
      setDeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDeal = async (id) => {
    if (!window.confirm('Are you sure you want to delete this deal? This action cannot be undone.')) return;
    
    try {
      const loadingToast = toast.loading('Deleting deal...');
      await dealsAPI.deleteDeal(id);
      
      setDeals(prev => prev.filter(deal => deal._id !== id));
      toast.success('Deal deleted successfully', { id: loadingToast });
    } catch (error) {
      console.error('Error deleting deal:', error);
      toast.error('Failed to delete deal. Please try again.');
    }
  };

  const handleEdit = (deal) => {
    console.log('Editing deal:', deal);
    setEditMode(true);
    setCurrentDealId(deal._id);
    setFormData({
      title: deal.title || '',
      description: deal.description || '',
      originalPrice: deal.originalPrice || '',
      dealPrice: deal.dealPrice || '',
      validTill: deal.validTill ? deal.validTill.split('T')[0] : '',
      isActive: deal.isActive !== false,
      image: null // Reset image file on edit
    });
    setImagePreview(deal.image || '');
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Only JPG, PNG, WEBP or GIF images are allowed');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('Please enter a deal title');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('Please enter a deal description');
      return;
    }
    
    if (!formData.originalPrice || formData.originalPrice <= 0) {
      toast.error('Please enter a valid original price');
      return;
    }
    
    if (!formData.dealPrice || formData.dealPrice <= 0) {
      toast.error('Please enter a valid deal price');
      return;
    }
    
    if (parseFloat(formData.dealPrice) >= parseFloat(formData.originalPrice)) {
      toast.error('Deal price must be less than original price');
      return;
    }
    
    if (!formData.validTill) {
      toast.error('Please select a valid till date');
      return;
    }
    
    if (new Date(formData.validTill) <= new Date()) {
      toast.error('Valid till date must be in the future');
      return;
    }

    try {
      setUploading(true);
      const loadingToast = toast.loading(editMode ? 'Updating deal...' : 'Creating deal...');

      // Create FormData object for file upload
      const submitFormData = new FormData();
      
      // Add text fields
      submitFormData.append('title', formData.title.trim());
      submitFormData.append('description', formData.description.trim());
      submitFormData.append('originalPrice', parseFloat(formData.originalPrice));
      submitFormData.append('dealPrice', parseFloat(formData.dealPrice));
      submitFormData.append('validTill', new Date(formData.validTill).toISOString());
      submitFormData.append('isActive', formData.isActive);
      
      // Add image file if selected
      if (formData.image) {
        submitFormData.append('image', formData.image);
      }

      let response;
      
      if (editMode && currentDealId) {
        // Update existing deal
        response = await dealsAPI.updateDeal(currentDealId, submitFormData);
        toast.success('Deal updated successfully', { id: loadingToast });
      } else {
        // Create new deal
        response = await dealsAPI.createDeal(submitFormData);
        toast.success('Deal created successfully', { id: loadingToast });
      }
      
      console.log('API Response:', response);
      
      // Refresh deals list
      await fetchDeals();
      
      // Reset form
      resetForm();
      
    } catch (error) {
      console.error('Error saving deal:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save deal. Please try again.';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      originalPrice: '',
      dealPrice: '',
      validTill: '',
      isActive: true,
      image: null
    });
    setImagePreview('');
    setEditMode(false);
    setCurrentDealId(null);
    setShowForm(false);
    setUploading(false);
  };

  const toggleDealStatus = async (deal) => {
    try {
      const loadingToast = toast.loading('Updating deal status...');
      
      const updatedData = {
        isActive: !deal.isActive
      };
      
      // Create FormData for status update
      const formData = new FormData();
      formData.append('isActive', !deal.isActive);
      
      await dealsAPI.updateDeal(deal._id, formData);
      
      // Update local state
      const updatedDeals = deals.map(d => 
        d._id === deal._id ? { ...d, isActive: !d.isActive } : d
      );
      setDeals(updatedDeals);
      
      toast.success(`Deal ${!deal.isActive ? 'activated' : 'deactivated'}`, { id: loadingToast });
    } catch (error) {
      console.error('Error updating deal status:', error);
      toast.error('Failed to update deal status');
    }
  };

  const calculateDiscount = (original, deal) => {
    if (!original || !deal || original <= 0) return 0;
    return Math.round(((original - deal) / original) * 100);
  };

  const isDealExpired = (validTill) => {
    if (!validTill) return false;
    return new Date(validTill) < new Date();
  };

  const filteredDeals = deals.filter(deal => {
    if (search && !deal.title?.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    switch (filter) {
      case 'active':
        return deal.isActive && !isDealExpired(deal.validTill);
      case 'inactive':
        return !deal.isActive;
      case 'expired':
        return isDealExpired(deal.validTill);
      default:
        return true;
    }
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  const getStats = () => {
    const totalDeals = deals.length;
    const activeDeals = deals.filter(d => d.isActive && !isDealExpired(d.validTill)).length;
    const expiredDeals = deals.filter(d => isDealExpired(d.validTill)).length;
    
    let avgDiscount = 0;
    if (totalDeals > 0) {
      const totalDiscount = deals.reduce((sum, deal) => {
        return sum + calculateDiscount(deal.originalPrice, deal.dealPrice);
      }, 0);
      avgDiscount = Math.round(totalDiscount / totalDeals);
    }
    
    return { totalDeals, activeDeals, expiredDeals, avgDiscount };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals Management</h1>
          <p className="text-gray-600">Create and manage special offers</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchDeals}
            disabled={loading}
            className="p-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Deal
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Deals</p>
              <p className="text-2xl font-bold mt-2">{stats.totalDeals}</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Tag className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Deals</p>
              <p className="text-2xl font-bold mt-2">{stats.activeDeals}</p>
            </div>
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Discount</p>
              <p className="text-2xl font-bold mt-2">{stats.avgDiscount}%</p>
            </div>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <Percent className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Expired Deals</p>
              <p className="text-2xl font-bold mt-2">{stats.expiredDeals}</p>
            </div>
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search deals by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Deals</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
                <option value="expired">Expired Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
          <span className="ml-2">Loading deals...</span>
        </div>
      ) : filteredDeals.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {deals.length === 0 ? 'No deals found' : 'No matching deals'}
          </h3>
          <p className="text-gray-600 mb-6">
            {search || filter !== 'all' 
              ? 'Try changing your search or filter criteria' 
              : 'Start by creating your first deal'
            }
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors mx-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create First Deal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map(deal => {
            const discount = calculateDiscount(deal.originalPrice, deal.dealPrice);
            const expired = isDealExpired(deal.validTill);
            
            return (
              <div key={deal._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                {/* Deal Image */}
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={deal.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop'}
                    alt={deal.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                      {discount}% OFF
                    </span>
                    {!deal.isActive && (
                      <span className="px-2 py-1 bg-gray-500 text-white text-xs font-bold rounded">
                        Inactive
                      </span>
                    )}
                    {expired && (
                      <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
                        Expired
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Deal Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{deal.title}</h3>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">${formatPrice(deal.dealPrice)}</p>
                      <p className="text-sm text-gray-500 line-through">${formatPrice(deal.originalPrice)}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{deal.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Valid till: {formatDate(deal.validTill)}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      deal.isActive && !expired 
                        ? 'bg-green-100 text-green-800' 
                        : expired 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {deal.isActive && !expired ? 'Active' : expired ? 'Expired' : 'Inactive'}
                    </span>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <button
                      onClick={() => toggleDealStatus(deal)}
                      disabled={expired}
                      className={`text-sm px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ${
                        deal.isActive
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                      title={expired ? "Can't activate expired deal" : ""}
                    >
                      {deal.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(deal)}
                        className="p-2 text-blue-600 hover:text-blue-800 bg-blue-50 rounded-lg hover:bg-blue-100"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDeal(deal._id)}
                        className="p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-lg hover:bg-red-100"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Deal Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {editMode ? 'Edit Deal' : 'Create New Deal'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 p-1"
                  disabled={uploading}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deal Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Weekend Special, Combo Deal"
                    required
                    disabled={uploading}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32"
                    placeholder="Describe the deal and its benefits..."
                    required
                    disabled={uploading}
                  />
                </div>

                {/* Prices */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price ($) *
                    </label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="49.99"
                      step="0.01"
                      min="0.01"
                      required
                      disabled={uploading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deal Price ($) *
                    </label>
                    <input
                      type="number"
                      name="dealPrice"
                      value={formData.dealPrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="34.99"
                      step="0.01"
                      min="0.01"
                      required
                      disabled={uploading}
                    />
                  </div>
                </div>

                {/* Discount Preview */}
                {formData.originalPrice && formData.dealPrice && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Discount:</span>
                      <span className="text-lg font-bold text-red-600">
                        {calculateDiscount(parseFloat(formData.originalPrice), parseFloat(formData.dealPrice))}% OFF
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-600">You save:</span>
                      <span className="font-medium">
                        ${(parseFloat(formData.originalPrice) - parseFloat(formData.dealPrice)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Valid Till */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid Till *
                  </label>
                  <input
                    type="date"
                    name="validTill"
                    value={formData.validTill}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    disabled={uploading}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deal Image {!editMode && '*'}
                  </label>
                  <div className="space-y-4">
                    {imagePreview && (
                      <div className="relative h-48 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview('');
                            setFormData(prev => ({ ...prev, image: null }));
                          }}
                          disabled={uploading}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      imagePreview ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                    } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <input
                        type="file"
                        id="deal-image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={uploading}
                      />
                      <label htmlFor="deal-image-upload" className={`cursor-pointer ${uploading ? 'pointer-events-none' : ''}`}>
                        <div className="space-y-2">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                            <Tag className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {imagePreview ? 'Change Image' : 'Upload Image'}
                            </p>
                            <p className="text-xs text-gray-500">
                              JPG, PNG or WEBP (max. 5MB)
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                    
                    {uploading && (
                      <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>{editMode ? 'Updating deal...' : 'Creating deal...'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    disabled={uploading}
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                    Active Deal (visible to customers)
                  </label>
                </div>

                {/* Required fields note */}
                <div className="text-sm text-gray-500 flex items-start">
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Fields marked with * are required. For image, you can skip in edit mode if you want to keep existing image.</span>
                </div>

                {/* Form Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={uploading}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {uploading ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        {editMode ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      editMode ? 'Update Deal' : 'Create Deal'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDeals;