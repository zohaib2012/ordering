import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const DealCard = ({ deal }) => {
  const { addToCart } = useCart();

  const calculateDiscount = () => {
    return Math.round(((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100);
  };

  const isDealExpired = () => {
    return new Date(deal.validTill) < new Date();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleAddToCart = () => {
    // Create a cart item from deal
    const cartItem = {
      _id: deal._id,
      name: deal.title,
      description: deal.description,
      price: deal.dealPrice,
      image: deal.image,
      isAvailable: deal.isActive && !isDealExpired()
    };
    
    addToCart(cartItem);
    toast.success(`${deal.title} added to cart`);
  };

  const discount = calculateDiscount();
  const expired = isDealExpired();

  if (!deal.isActive || expired) {
    return null; // Don't show inactive or expired deals
  }

  return (
    <div className="bg-gradient-to-br from-red-500 via-orange-500 to-red-600 text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Deal Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold flex items-center">
          <Tag className="h-3 w-3 mr-1" />
          {discount}% OFF
        </div>
      </div>

      {/* Deal Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Deal Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
          <p className="text-white/90 text-sm">{deal.description}</p>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">${deal.dealPrice}</span>
              <span className="text-sm line-through opacity-75">${deal.originalPrice}</span>
            </div>
            <p className="text-sm text-white/80">Save ${(deal.originalPrice - deal.dealPrice).toFixed(2)}</p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>Valid till: {formatDate(deal.validTill)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            Add to Cart
          </button>
          <Link
            to="/menu"
            className="flex items-center justify-center bg-white/20 text-white py-3 px-4 rounded-lg font-semibold hover:bg-white/30 transition-colors"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Timer for limited deals */}
        {new Date(deal.validTill).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000 && ( // Within 7 days
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="h-4 w-4 animate-pulse" />
              <span className="text-sm">Limited time offer!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealCard;