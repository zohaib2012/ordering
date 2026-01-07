import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  Tag, 
  ShoppingBag, 
  BarChart3,
  LogOut,
  Menu as MenuIcon,
  X,
  Settings,
  DiscIcon,
  DnaOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/admin/menu', label: 'Menu Items', icon: <Utensils className="h-5 w-5" /> },
    { path: '/admin/categories', label: 'Categories', icon: <Tag className="h-5 w-5" /> },
    { path: '/admin/orders', label: 'Orders', icon: <ShoppingBag className="h-5 w-5" /> },
      { path: '/admin/deals', label: 'Deals & Offers', icon: <DnaOff className="h-5 w-5" /> },
    { path: '/admin/reports', label: 'Reports', icon: <BarChart3 className="h-5 w-5" /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden bg-white shadow-md p-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-600 hover:text-gray-900"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-gray-900 text-white transition-transform duration-300
          lg:block
        `}>
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-800">
              <h1 className="text-xl font-bold">FoodExpress Admin</h1>
              <p className="text-gray-400 text-sm">Management Panel</p>
            </div>

            {/* Navigation */}
            <nav className="flex-grow p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/admin'}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) => `
                        flex items-center space-x-3 px-4 py-3 rounded-lg
                        transition-colors hover:bg-gray-800
                        ${isActive ? 'bg-orange-600 text-white' : 'text-gray-300'}
                      `}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-800">
              <button
                onClick={logout}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg
                         text-gray-300 hover:bg-gray-800 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-grow p-6">
          <div className="bg-white rounded-lg shadow-md p-6 min-h-[calc(100vh-3rem)]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;