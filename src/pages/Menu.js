import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart, ArrowRight } from 'lucide-react';
import MenuItemCard from '../components/MenuItemCard';
import { menuAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sort: 'createdAt',
    order: 'desc'
  });
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, menuItemsRes] = await Promise.all([
        menuAPI.getCategories(),
        menuAPI.getMenuItems()
      ]);
      
      setCategories(categoriesRes.data);
      setMenuItems(menuItemsRes.data);
    } catch (error) {
      console.error('Error fetching menu data:', error);
      toast.error('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getMenuItems(filters);
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error searching menu:', error);
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  const filteredItems = menuItems.filter(item => {
    if (filters.category !== 'all' && item.category?._id !== filters.category) {
      return false;
    }
    if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  if (loading && menuItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
        <p className="text-lg opacity-90">Explore our delicious selection of food</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for dishes..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-6">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <span className="font-medium">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilters({...filters, category: 'all'})}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filters.category === 'all'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category._id}
                onClick={() => setFilters({...filters, category: category._id})}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  filters.category === category._id
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

{/* // Add near the top of Menu.js, after categories section: */}



      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'} Found
          </h2>
          {filters.category !== 'all' && (
            <p className="text-gray-600">
              in {categories.find(c => c._id === filters.category)?.name}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={`${filters.sort}-${filters.order}`}
            onChange={(e) => {
              const [sort, order] = e.target.value.split('-');
              setFilters({...filters, sort, order});
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Menu Items */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try changing your search or filter criteria</p>
          <button
            onClick={() => setFilters({...filters, search: '', category: 'all'})}
            className="mt-4 btn-primary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
        }>
          {filteredItems.map(item => (
            <div key={item._id} className={viewMode === 'list' ? 'bg-white rounded-lg shadow p-4' : ''}>
              {viewMode === 'grid' ? (
                <MenuItemCard item={item} />
              ) : (
                <div className="flex items-center">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image || '/placeholder-food.jpg'}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="ml-6 flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        <div className="flex items-center mt-2">
                          {item.isTopSelling && (
                            <span className="inline-flex items-center text-xs text-orange-600">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Top Selling
                            </span>
                          )}
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-600">{item.category?.name}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.isAvailable}
                          className={`mt-2 px-4 py-2 rounded-lg font-medium ${
                            item.isAvailable
                              ? 'bg-orange-600 hover:bg-orange-700 text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Top Selling Section */}
      {menuItems.some(item => item.isTopSelling) && (
        <div className="mt-12">
          <div className="flex items-center mb-6">
            <Star className="h-6 w-6 text-orange-500 mr-2 fill-current" />
            <h2 className="text-2xl font-bold">Top Selling Items</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems
              .filter(item => item.isTopSelling)
              .slice(0, 4)
              .map(item => (
                <MenuItemCard key={item._id} item={item} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;