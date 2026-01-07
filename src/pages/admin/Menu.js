// import React, { useState, useEffect } from 'react';
// import { Plus, Edit, Trash2, Eye, Filter, Search, Grid, List } from 'lucide-react';
// import { adminAPI } from '../../utils/api';
// import toast from 'react-hot-toast';
// import LoadingSpinner from '../../components/LoadingSpinner';

// const AdminMenu = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [viewMode, setViewMode] = useState('grid');
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [menuRes, categoriesRes] = await Promise.all([
//         adminAPI.getAllMenuItems(),
//         adminAPI.getAllCategories()
//       ]);
//       setMenuItems(menuRes.data.menuItems || []);
//       setCategories(categoriesRes.data || []);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       toast.error('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteItem = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this item?')) return;
    
//     try {
//       await adminAPI.deleteMenuItem(id);
//       toast.success('Menu item deleted successfully');
//       fetchData();
//     } catch (error) {
//       toast.error('Failed to delete menu item');
//     }
//   };

//   const filteredItems = menuItems.filter(item => {
//     if (categoryFilter !== 'all' && item.category?._id !== categoryFilter) {
//       return false;
//     }
//     if (search && !item.name.toLowerCase().includes(search.toLowerCase())) {
//       return false;
//     }
//     return true;
//   });

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
//           <p className="text-gray-600">Manage your restaurant menu items</p>
//         </div>
        
//         <button
//           onClick={() => setShowForm(true)}
//           className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
//         >
//           <Plus className="h-5 w-5 mr-2" />
//           Add New Item
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search menu items..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
//               />
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             >
//               <option value="all">All Categories</option>
//               {categories.map(cat => (
//                 <option key={cat._id} value={cat._id}>{cat.name}</option>
//               ))}
//             </select>
            
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
//               >
//                 <Grid className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
//               >
//                 <List className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Menu Items */}
//       {loading ? (
//         <div className="flex justify-center py-12">
//           <LoadingSpinner size="large" />
//         </div>
//       ) : filteredItems.length === 0 ? (
//         <div className="bg-white rounded-lg shadow p-8 text-center">
//           <div className="text-6xl mb-4">🍕</div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No menu items found</h3>
//           <p className="text-gray-600">Start by adding your first menu item</p>
//           <button
//             onClick={() => setShowForm(true)}
//             className="mt-4 btn-primary"
//           >
//             <Plus className="h-5 w-5 mr-2 inline" />
//             Add First Item
//           </button>
//         </div>
//       ) : (
//         <div className={viewMode === 'grid' 
//           ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
//           : 'space-y-4'
//         }>
//           {filteredItems.map(item => (
//             <div key={item._id} className={`
//               ${viewMode === 'grid' 
//                 ? 'bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow' 
//                 : 'bg-white rounded-lg shadow p-4'
//               }
//             `}>
//               {viewMode === 'grid' ? (
//                 <>
//                   <div className="h-48 overflow-hidden">
//                     <img
//                       src={item.image || '/placeholder-food.jpg'}
//                       alt={item.name}
//                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="font-semibold text-lg">{item.name}</h3>
//                       <span className="font-bold text-gray-900">${item.price}</span>
//                     </div>
//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-500">{item.category?.name}</span>
//                       <div className="flex items-center space-x-2">
//                         <button className="p-1 text-blue-600 hover:text-blue-800">
//                           <Eye className="h-4 w-4" />
//                         </button>
//                         <button className="p-1 text-green-600 hover:text-green-800">
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button 
//                           onClick={() => handleDeleteItem(item._id)}
//                           className="p-1 text-red-600 hover:text-red-800"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex items-center">
//                   <div className="w-24 h-24 flex-shrink-0">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   </div>
//                   <div className="ml-4 flex-grow">
//                     <div className="flex justify-between">
//                       <div>
//                         <h3 className="font-semibold">{item.name}</h3>
//                         <p className="text-gray-600 text-sm mt-1">{item.description}</p>
//                         <div className="flex items-center mt-2 space-x-4">
//                           <span className="text-sm text-gray-500">{item.category?.name}</span>
//                           <span className="text-sm px-2 py-1 rounded-full bg-gray-100">
//                             {item.isTopSelling ? 'Top Selling' : 'Regular'}
//                           </span>
//                           <span className={`text-sm px-2 py-1 rounded-full ${
//                             item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                           }`}>
//                             {item.isAvailable ? 'Available' : 'Unavailable'}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-xl font-bold">${item.price}</p>
//                         <div className="flex items-center space-x-2 mt-2">
//                           <button className="p-2 text-blue-600 hover:text-blue-800 bg-blue-50 rounded-lg">
//                             <Edit className="h-4 w-4" />
//                           </button>
//                           <button 
//                             onClick={() => handleDeleteItem(item._id)}
//                             className="p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-lg"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Add/Edit Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">Add New Menu Item</h2>
//                 <button
//                   onClick={() => setShowForm(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ✕
//                 </button>
//               </div>
//               {/* Form content here */}
//               <div className="h-96 flex items-center justify-center text-gray-500">
//                 Form implementation required
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default AdminMenu;

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Filter, Search, Grid, List, X, Image as ImageIcon, Check, XCircle } from 'lucide-react';
import { adminAPI, menuAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isTopSelling: false,
    isAvailable: true,
    image: null
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [menuRes, categoriesRes] = await Promise.all([
        adminAPI.getAllMenuItems(),
        adminAPI.getAllCategories()
      ]);
      setMenuItems(menuRes.data.menuItems || []);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await adminAPI.deleteMenuItem(id);
      toast.success('Menu item deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete menu item');
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentItemId(item._id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category?._id || '',
      isTopSelling: item.isTopSelling,
      isAvailable: item.isAvailable,
      image: null
    });
    setImagePreview(item.image);
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
    
    if (!formData.name.trim() || !formData.description.trim() || !formData.price || !formData.category) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('isTopSelling', formData.isTopSelling);
      formDataToSend.append('isAvailable', formData.isAvailable);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (editMode && currentItemId) {
        await adminAPI.updateMenuItem(currentItemId, formDataToSend);
        toast.success('Menu item updated successfully');
      } else {
        await adminAPI.addMenuItem(formDataToSend);
        toast.success('Menu item added successfully');
      }

      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast.error(error.response?.data?.message || 'Failed to save menu item');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      isTopSelling: false,
      isAvailable: true,
      image: null
    });
    setImagePreview('');
    setEditMode(false);
    setCurrentItemId(null);
    setShowForm(false);
  };

  const toggleItemStatus = async (item, field) => {
    try {
      const formData = new FormData();
      formData.append(field, !item[field]);
      
      await adminAPI.updateMenuItem(item._id, formData);
      toast.success(`${field === 'isTopSelling' ? 'Top selling' : 'Availability'} updated`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update item');
    }
  };

  const filteredItems = menuItems.filter(item => {
    if (categoryFilter !== 'all' && item.category?._id !== categoryFilter) {
      return false;
    }
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">Manage your restaurant menu items</p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-6xl mb-4">🍕</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No menu items found</h3>
          <p className="text-gray-600">Start by adding your first menu item</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 btn-primary"
          >
            <Plus className="h-5 w-5 mr-2 inline" />
            Add First Item
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {filteredItems.map(item => (
            <div key={item._id} className={`
              ${viewMode === 'grid' 
                ? 'bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow' 
                : 'bg-white rounded-lg shadow p-4'
              }
            `}>
              {viewMode === 'grid' ? (
                <>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={item.image || '/placeholder-food.jpg'}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex space-x-1">
                      {item.isTopSelling && (
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                          Top
                        </span>
                      )}
                      {!item.isAvailable && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                          Unavailable
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <span className="font-bold text-gray-900">${item.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{item.category?.name}</span>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => toggleItemStatus(item, 'isTopSelling')}
                          className={`p-1 rounded ${item.isTopSelling ? 'text-orange-600 bg-orange-50' : 'text-gray-400 hover:text-gray-600'}`}
                          title={item.isTopSelling ? 'Remove from top selling' : 'Mark as top selling'}
                        >
                          <Filter className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => toggleItemStatus(item, 'isAvailable')}
                          className={`p-1 rounded ${item.isAvailable ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}
                          title={item.isAvailable ? 'Mark as unavailable' : 'Mark as available'}
                        >
                          {item.isAvailable ? <Check className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        </button>
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item._id)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-gray-500">{item.category?.name}</span>
                          <button 
                            onClick={() => toggleItemStatus(item, 'isTopSelling')}
                            className={`text-sm px-2 py-1 rounded-full ${item.isTopSelling ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}`}
                          >
                            {item.isTopSelling ? 'Top Selling' : 'Regular'}
                          </button>
                          <button 
                            onClick={() => toggleItemStatus(item, 'isAvailable')}
                            className={`text-sm px-2 py-1 rounded-full ${item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {item.isAvailable ? 'Available' : 'Unavailable'}
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">${item.price}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="p-2 text-blue-600 hover:text-blue-800 bg-blue-50 rounded-lg"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteItem(item._id)}
                            className="p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {editMode ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Margherita Pizza"
                    required
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
                    placeholder="Describe your menu item..."
                    required
                  />
                </div>

                {/* Price and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="9.99"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Image *
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
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      imagePreview ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="space-y-2">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                            <ImageIcon className="h-6 w-6 text-gray-600" />
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
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isTopSelling"
                      name="isTopSelling"
                      checked={formData.isTopSelling}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="isTopSelling" className="ml-2 text-sm text-gray-700">
                      Mark as Top Selling Item
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isAvailable"
                      name="isAvailable"
                      checked={formData.isAvailable}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="isAvailable" className="ml-2 text-sm text-gray-700">
                      Available for ordering
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                  >
                    {editMode ? 'Update Item' : 'Create Item'}
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

export default AdminMenu;