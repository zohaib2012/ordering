import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Printer, 
  Share2, 
  Clock, 
  CheckCircle, 
  Package, 
  Truck, 
  Home,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  ShoppingBag,
  User,
  Calendar,
  FileText,
  AlertCircle
} from 'lucide-react';
import { orderAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin] = useState(user?.role === 'admin');

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderAPI.getOrder(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Failed to load order details');
      toast.error('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-6 w-6 text-blue-500" />;
      case 'preparing':
        return <Package className="h-6 w-6 text-purple-500" />;
      case 'ready':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'delivered':
        return <Truck className="h-6 w-6 text-green-600" />;
      case 'cancelled':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Order Placed';
      case 'confirmed': return 'Order Confirmed';
      case 'preparing': return 'Preparing Your Food';
      case 'ready': return 'Ready for Pickup/Delivery';
      case 'delivered': return 'Delivered Successfully';
      case 'cancelled': return 'Order Cancelled';
      default: return 'Processing';
    }
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case 'pending': return 'We have received your order and will confirm shortly.';
      case 'confirmed': return 'Your order has been confirmed and is being prepared.';
      case 'preparing': return 'Our chefs are preparing your delicious meal.';
      case 'ready': return 'Your order is ready for pickup/delivery.';
      case 'delivered': return 'Your order has been successfully delivered. Enjoy your meal!';
      case 'cancelled': return 'This order has been cancelled.';
      default: return 'Order is being processed.';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressSteps = () => {
    const steps = [
      { status: 'pending', label: 'Order Placed' },
      { status: 'confirmed', label: 'Confirmed' },
      { status: 'preparing', label: 'Preparing' },
      { status: 'ready', label: 'Ready' },
      { status: 'delivered', label: 'Delivered' }
    ];
    
    const currentIndex = steps.findIndex(step => step.status === order?.status);
    
    return steps.map((step, index) => ({
      ...step,
      active: index <= currentIndex,
      completed: index < currentIndex
    }));
  };

  const handlePrintReceipt = () => {
    window.print();
    toast.success('Printing receipt...');
  };

  const handleShareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Order #${order._id.slice(-8)}`,
          text: `Check out my order from FoodExpress!`,
          url: window.location.href,
        });
        toast.success('Order shared successfully');
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    try {
      await orderAPI.cancelOrder(order._id);
      toast.success('Order cancelled successfully');
      fetchOrderDetails(); // Refresh order details
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel order');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDeliveryTime = () => {
    if (!order?.createdAt) return 'N/A';
    
    const orderTime = new Date(order.createdAt);
    const deliveryTime = new Date(orderTime);
    
    if (order.orderType === 'pickup') {
      deliveryTime.setMinutes(deliveryTime.getMinutes() + 30); // 30 minutes for pickup
    } else {
      deliveryTime.setMinutes(deliveryTime.getMinutes() + 45); // 45 minutes for delivery
    }
    
    return deliveryTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
          <span className="ml-4 text-gray-600">Loading order details...</span>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'Order Not Found'}
          </h2>
          <p className="text-gray-600 mb-6">
            The order you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/orders"
              className="btn-primary"
            >
              <ArrowLeft className="h-5 w-5 mr-2 inline" />
              View All Orders
            </Link>
            <Link
              to="/menu"
              className="btn-secondary"
            >
              <ShoppingBag className="h-5 w-5 mr-2 inline" />
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progressSteps = getProgressSteps();
  const isCancellable = order.status === 'pending';
  const deliveryTime = calculateDeliveryTime();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Orders
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
          <p className="text-gray-600">Track your order and view details</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleShareOrder}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
          <button
            onClick={handlePrintReceipt}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Receipt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order Status</h2>
                <p className="text-gray-600">#{order._id.slice(-8)}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {progressSteps.map((step, index) => (
                  <div key={step.status} className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center mb-2
                      ${step.completed ? 'bg-green-500 text-white' : 
                        step.active ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'}
                    `}>
                      {step.completed ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        getStatusIcon(step.status)
                      )}
                    </div>
                    <span className={`text-xs font-medium ${
                      step.active ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(progressSteps.findIndex(s => s.status === order.status) + 1) / progressSteps.length * 100}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* Status Description */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                {getStatusIcon(order.status)}
                <div className="ml-3">
                  <h3 className="font-medium">{getStatusText(order.status)}</h3>
                  <p className="text-sm text-gray-600 mt-1">{getStatusDescription(order.status)}</p>
                </div>
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="mt-6 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Estimated {order.orderType === 'delivery' ? 'Delivery' : 'Pickup'} Time</p>
                  <p className="text-xl font-bold">{deliveryTime}</p>
                </div>
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
            </div>

            {/* Cancel Button */}
            {isCancellable && !isAdmin && (
              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={handleCancelOrder}
                  className="w-full px-4 py-3 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
            
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4">
                      {item.menuItem?.image ? (
                        <img
                          src={item.menuItem.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <ShoppingBag className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
                </div>
                
                {order.orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">
                      {order.totalAmount > 20 ? 'Free' : '$2.99'}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">${(order.totalAmount * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      ${(
                        order.totalAmount + 
                        (order.orderType === 'delivery' && order.totalAmount <= 20 ? 2.99 : 0) + 
                        (order.totalAmount * 0.08)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Note */}
          {order.orderNote && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Special Instructions</h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{order.orderNote}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Order Info */}
        <div className="space-y-6">
          {/* Order Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Order Date & Time</p>
                  <p className="font-medium">{formatDate(order.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Order Type</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.orderType === 'delivery' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.paymentMethod === 'cod' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {order.paymentMethod.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{order.user?.name || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery/Pickup Info */}
          {order.orderType === 'delivery' && order.deliveryAddress ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{order.deliveryAddress.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{order.deliveryAddress.phone}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">
                    {order.deliveryAddress.street}<br />
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                  </p>
                </div>
              </div>
            </div>
          ) : order.orderType === 'pickup' ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Home className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Pickup Information</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Restaurant Address</p>
                  <p className="font-medium">
                    123 Food Street<br />
                    New York, NY 10001
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">+1 (234) 567-8900</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Hours</p>
                  <p className="font-medium">9:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          ) : null}

          {/* Customer Support */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6">
            <h3 className="text-lg font-bold mb-3">Need Help?</h3>
            <p className="text-sm opacity-90 mb-4">
              Having issues with your order? Our support team is here to help.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 opacity-80" />
                <span className="text-sm">+1 (234) 567-8900</span>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 opacity-80" />
                <span className="text-sm">support@foodexpress.com</span>
              </div>
            </div>
            
            <button className="w-full mt-4 px-4 py-2 bg-white text-orange-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
          </div>

          {/* Helpful Links */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-medium mb-4">Helpful Links</h3>
            <div className="space-y-2">
              <Link to="/menu" className="flex items-center text-orange-600 hover:text-orange-700">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Order Again
              </Link>
              <Link to="/orders" className="flex items-center text-gray-700 hover:text-gray-900">
                <FileText className="h-4 w-4 mr-2" />
                View All Orders
              </Link>
              <Link to="/" className="flex items-center text-gray-700 hover:text-gray-900">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          .print-only {
            display: block !important;
          }
          
          body {
            background: white !important;
          }
          
          .container {
            max-width: 100% !important;
            padding: 0 !important;
          }
        }
        
        .print-only {
          display: none;
        }
      `}</style>

      {/* Print Receipt Modal */}
      <div className="print-only">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">FoodExpress</h1>
            <p className="text-gray-600">123 Food Street, New York, NY 10001</p>
            <p className="text-gray-600">+1 (234) 567-8900</p>
          </div>
          
          <div className="border-t border-b border-gray-300 py-4 mb-4">
            <h2 className="text-xl font-bold text-center">ORDER RECEIPT</h2>
            <p className="text-center">#{order._id.slice(-8)}</p>
            <p className="text-center">{formatDate(order.createdAt)}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold mb-2">Order Items:</h3>
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between mb-1">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between mb-1">
              <span>Subtotal:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Tax (8%):</span>
              <span>${(order.totalAmount * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2 mt-2">
              <span>Total:</span>
              <span>${(order.totalAmount + (order.totalAmount * 0.08)).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Thank you for ordering from FoodExpress!</p>
            <p>Visit us again soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;