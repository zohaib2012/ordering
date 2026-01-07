import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  Tag, 
  ShoppingBag, 
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu as MenuIcon,
  X,
  Bell,
  ChevronRight,
  Settings2,
  DiscIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/admin/menu', label: 'Menu Items', icon: <Utensils className="h-5 w-5" /> },
    { path: '/admin/categories', label: 'Categories', icon: <Tag className="h-5 w-5" /> },
    { path: '/admin/orders', label: 'Orders', icon: <ShoppingBag className="h-5 w-5" /> },
    { path: '/admin/users', label: 'Customers', icon: <Users className="h-5 w-5" /> },
      { path: '/admin/deals', label: 'Deals & Offers', icon: <DiscIcon className="h-5 w-5" /> },
    { path: '/admin/reports', label: 'Reports', icon: <BarChart3 className="h-5 w-5" /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden bg-white shadow-sm p-4 border-b flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-600 hover:text-gray-900"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
        <div className="flex items-center space-x-4">
          <span className="font-medium">Admin Panel</span>
          <button className="relative p-2">
            <Bell className="h-5 w-5 text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out
        lg:block flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">FoodExpress</h1>
              <p className="text-gray-400 text-sm">Admin Panel</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Admin Info */}
          <div className="mt-6 p-3 bg-gray-800 rounded-lg">
            <p className="font-medium truncate">{user?.name || 'Admin User'}</p>
            <p className="text-sm text-gray-400 truncate">{user?.email || 'admin@foodexpress.com'}</p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-600">
                Administrator
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium px-3 mb-2">
              Main Menu
            </p>
          </div>
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/admin' && location.pathname.startsWith(item.path));
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-lg
                      transition-all duration-200 group
                      ${isActive 
                        ? 'bg-orange-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isActive && (
                      <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Notifications & Logout */}
        <div className="p-4 border-t border-gray-800 space-y-4">
          {/* Notifications */}
          <div className="p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Notifications</span>
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                {notifications.length} new
              </span>
            </div>
            <p className="text-xs text-gray-400">
              You have {notifications.length} unread notifications
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 
                     bg-red-600 hover:bg-red-700 text-white rounded-lg
                     font-medium transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;