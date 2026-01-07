import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  Users,
  TrendingUp,
  Bell
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    todayOrders: 0,
    todayRevenue: 0,
    pendingOrders: 0,
    totalUsers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    fetchDashboardData();
    setupSocket();
    
    // Setup notification sound
    audioRef.current = new Audio('/notification.mp3');

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/dashboard');
      setStats({
        todayOrders: response.data.stats.todayOrders,
        todayRevenue: response.data.stats.todayRevenue[0]?.total || 0,
        pendingOrders: response.data.stats.pendingOrders,
        totalUsers: response.data.stats.totalUsers
      });
      setRecentOrders(response.data.recentOrders);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const setupSocket = () => {
    socketRef.current = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
      transports: ['websocket']
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to socket server');
      socketRef.current.emit('joinAdminRoom');
    });

    socketRef.current.on('newOrder', (order) => {
      // Play notification sound
      audioRef.current.play().catch(console.error);
      
      // Show toast notification
      toast.custom((t) => (
        <div className={`bg-white rounded-lg shadow-lg p-4 max-w-sm ${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}>
          <div className="flex items-start">
            <Bell className="h-6 w-6 text-green-500 mt-0.5" />
            <div className="ml-3">
              <p className="font-semibold">New Order Received!</p>
              <p className="text-sm text-gray-600">
                Order #{order._id.slice(-6)} - ${order.totalAmount}
              </p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => {
                    window.location.href = `/admin/orders?order=${order._id}`;
                    toast.dismiss(t.id);
                  }}
                  className="text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700"
                >
                  View Order
                </button>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      ));

      // Update dashboard stats
      setStats(prev => ({
        ...prev,
        todayOrders: prev.todayOrders + 1,
        todayRevenue: prev.todayRevenue + order.totalAmount,
        pendingOrders: prev.pendingOrders + 1
      }));

      // Add to recent orders
      setRecentOrders(prev => [order, ...prev.slice(0, 9)]);
    });
  };

  const statCards = [
    {
      title: "Today's Orders",
      value: stats.todayOrders,
      icon: ShoppingBag,
      color: "bg-blue-500",
      trend: "+12%"
    },
    {
      title: "Today's Revenue",
      value: `$${stats.todayRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-green-500",
      trend: "+8%"
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      color: "bg-yellow-500",
      trend: "-3%"
    },
    {
      title: "Total Customers",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-purple-500",
      trend: "+5%"
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-600">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500 ml-1">{stat.trend}</span>
                  <span className="text-sm text-gray-500 ml-2">from yesterday</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium">#{order._id.slice(-6)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium">{order.user?.name}</div>
                      <div className="text-sm text-gray-500">{order.user?.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold">${order.totalAmount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;