import React, { useState, useEffect } from 'react';
import { 
  Save,
  Upload,
  Building,
  Phone,
  MapPin,
  Clock,
  Mail,
  Globe,
  CreditCard,
  Shield,
  Bell,
  Palette,
  Store
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    general: {
      shopName: 'FoodExpress',
      tagline: 'Delicious Food Delivered',
      contactEmail: 'contact@foodexpress.com',
      contactPhone: '+1 234 567 8900',
      website: 'www.foodexpress.com',
      logo: null,
      favicon: null,
      shopDescription: 'Your favorite food delivered fast and fresh'
    },
    
    // Business Hours
    businessHours: {
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '21:00', closed: false }
    },
    
    // Location & Delivery
    location: {
      address: '123 Food Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      deliveryRadius: 10, // in miles/km
      deliveryFee: 2.99,
      freeDeliveryThreshold: 20,
      pickupAvailable: true,
      deliveryAvailable: true
    },
    
    // Payment Settings
    payment: {
      codEnabled: true,
      onlinePaymentEnabled: true,
      stripeEnabled: false,
      stripePublicKey: '',
      stripeSecretKey: '',
      paypalEnabled: false,
      paypalClientId: ''
    },
    
    // Notification Settings
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      orderConfirmation: true,
      orderStatusUpdates: true,
      promotionalEmails: false,
      lowStockAlerts: true,
      newOrderAlerts: true
    },
    
    // Theme Settings
    theme: {
      primaryColor: '#f97316', // Orange
      secondaryColor: '#1f2937', // Gray-800
      backgroundColor: '#ffffff',
      textColor: '#111827',
      borderRadius: '0.5rem',
      fontFamily: 'Inter, sans-serif'
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: <Store className="h-5 w-5" /> },
    { id: 'businessHours', label: 'Business Hours', icon: <Clock className="h-5 w-5" /> },
    { id: 'location', label: 'Location & Delivery', icon: <MapPin className="h-5 w-5" /> },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'theme', label: 'Theme & Design', icon: <Palette className="h-5 w-5" /> }
  ];

  useEffect(() => {
    // Load settings from API/localStorage
    const savedSettings = localStorage.getItem('shopSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedChange = (section, parent, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: {
          ...prev[section][parent],
          [field]: value
        }
      }
    }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      localStorage.setItem('shopSettings', JSON.stringify(settings));
      
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('general', type, reader.result);
      };
      reader.readAsDataURL(file);
      toast.success(`${type === 'logo' ? 'Logo' : 'Favicon'} uploaded`);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop Name *
                </label>
                <input
                  type="text"
                  value={settings.general.shopName}
                  onChange={(e) => handleInputChange('general', 'shopName', e.target.value)}
                  className="w-full input-field"
                  placeholder="Your Restaurant Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settings.general.tagline}
                  onChange={(e) => handleInputChange('general', 'tagline', e.target.value)}
                  className="w-full input-field"
                  placeholder="Your restaurant tagline"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                    className="pl-10 input-field"
                    placeholder="contact@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={settings.general.contactPhone}
                    onChange={(e) => handleInputChange('general', 'contactPhone', e.target.value)}
                    className="pl-10 input-field"
                    placeholder="+1234567890"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="url"
                  value={settings.general.website}
                  onChange={(e) => handleInputChange('general', 'website', e.target.value)}
                  className="pl-10 input-field"
                  placeholder="https://www.example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop Description
              </label>
              <textarea
                value={settings.general.shopDescription}
                onChange={(e) => handleInputChange('general', 'shopDescription', e.target.value)}
                className="w-full input-field h-32"
                placeholder="Describe your restaurant..."
                rows={4}
              />
            </div>

            {/* Logo Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                    className="hidden"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium">Upload Logo</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </label>
                  {settings.general.logo && (
                    <div className="mt-4">
                      <img
                        src={settings.general.logo}
                        alt="Logo Preview"
                        className="h-16 mx-auto"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Favicon
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="favicon-upload"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'favicon')}
                    className="hidden"
                  />
                  <label htmlFor="favicon-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium">Upload Favicon</p>
                    <p className="text-xs text-gray-500">ICO, PNG up to 100KB</p>
                  </label>
                  {settings.general.favicon && (
                    <div className="mt-4">
                      <img
                        src={settings.general.favicon}
                        alt="Favicon Preview"
                        className="h-8 w-8 mx-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'businessHours':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Set your restaurant's operating hours. Customers will only be able to place orders during these hours.
              </p>
            </div>

            {Object.entries(settings.businessHours).map(([day, hours]) => (
              <div key={day} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${day}-closed`}
                      checked={!hours.closed}
                      onChange={(e) => handleNestedChange('businessHours', day, 'closed', !e.target.checked)}
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor={`${day}-closed`} className="ml-2 font-medium capitalize">
                      {day}
                    </label>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    hours.closed ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {hours.closed ? 'Closed' : 'Open'}
                  </span>
                </div>

                {!hours.closed && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opening Time
                      </label>
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) => handleNestedChange('businessHours', day, 'open', e.target.value)}
                        className="w-full input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Closing Time
                      </label>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) => handleNestedChange('businessHours', day, 'close', e.target.value)}
                        className="w-full input-field"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Configure your restaurant location and delivery settings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={settings.location.address}
                  onChange={(e) => handleInputChange('location', 'address', e.target.value)}
                  className="w-full input-field"
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={settings.location.city}
                  onChange={(e) => handleInputChange('location', 'city', e.target.value)}
                  className="w-full input-field"
                  placeholder="New York"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Province *
                </label>
                <input
                  type="text"
                  value={settings.location.state}
                  onChange={(e) => handleInputChange('location', 'state', e.target.value)}
                  className="w-full input-field"
                  placeholder="NY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP/Postal Code *
                </label>
                <input
                  type="text"
                  value={settings.location.zipCode}
                  onChange={(e) => handleInputChange('location', 'zipCode', e.target.value)}
                  className="w-full input-field"
                  placeholder="10001"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Radius (miles/km)
                </label>
                <input
                  type="number"
                  value={settings.location.deliveryRadius}
                  onChange={(e) => handleInputChange('location', 'deliveryRadius', e.target.value)}
                  className="w-full input-field"
                  min="1"
                  max="50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Fee ($)
                </label>
                <input
                  type="number"
                  value={settings.location.deliveryFee}
                  onChange={(e) => handleInputChange('location', 'deliveryFee', e.target.value)}
                  className="w-full input-field"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Free Delivery Minimum Order ($)
              </label>
              <input
                type="number"
                value={settings.location.freeDeliveryThreshold}
                onChange={(e) => handleInputChange('location', 'freeDeliveryThreshold', e.target.value)}
                className="w-full input-field"
                step="0.01"
                min="0"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pickup-available"
                  checked={settings.location.pickupAvailable}
                  onChange={(e) => handleInputChange('location', 'pickupAvailable', e.target.checked)}
                  className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="pickup-available" className="ml-2 text-gray-700">
                  Enable Pickup Orders
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="delivery-available"
                  checked={settings.location.deliveryAvailable}
                  onChange={(e) => handleInputChange('location', 'deliveryAvailable', e.target.checked)}
                  className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="delivery-available" className="ml-2 text-gray-700">
                  Enable Delivery Orders
                </label>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Configure payment methods available to your customers.
              </p>
            </div>

            <div className="space-y-6">
              {/* Cash on Delivery */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg mr-3">
                      💵
                    </div>
                    <div>
                      <h4 className="font-medium">Cash on Delivery</h4>
                      <p className="text-sm text-gray-600">Pay when order is delivered</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="cod-enabled"
                      checked={settings.payment.codEnabled}
                      onChange={(e) => handleInputChange('payment', 'codEnabled', e.target.checked)}
                      className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Online Payments */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
                      💳
                    </div>
                    <div>
                      <h4 className="font-medium">Online Payments</h4>
                      <p className="text-sm text-gray-600">Pay with card or digital wallet</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="online-payment-enabled"
                      checked={settings.payment.onlinePaymentEnabled}
                      onChange={(e) => handleInputChange('payment', 'onlinePaymentEnabled', e.target.checked)}
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>

                {settings.payment.onlinePaymentEnabled && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    {/* Stripe Integration */}
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="stripe-enabled"
                          checked={settings.payment.stripeEnabled}
                          onChange={(e) => handleInputChange('payment', 'stripeEnabled', e.target.checked)}
                          className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="stripe-enabled" className="ml-2 font-medium">
                          Stripe Integration
                        </label>
                      </div>
                      
                      {settings.payment.stripeEnabled && (
                        <div className="ml-6 space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Stripe Publishable Key
                            </label>
                            <input
                              type="text"
                              value={settings.payment.stripePublicKey}
                              onChange={(e) => handleInputChange('payment', 'stripePublicKey', e.target.value)}
                              className="w-full input-field"
                              placeholder="pk_live_..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Stripe Secret Key
                            </label>
                            <input
                              type="password"
                              value={settings.payment.stripeSecretKey}
                              onChange={(e) => handleInputChange('payment', 'stripeSecretKey', e.target.value)}
                              className="w-full input-field"
                              placeholder="sk_live_..."
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Configure how you and your customers receive notifications.
              </p>
            </div>

            <div className="space-y-6">
              {/* Customer Notifications */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium text-lg mb-4">Customer Notifications</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Confirmation</p>
                      <p className="text-sm text-gray-600">Send confirmation when order is placed</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.orderConfirmation}
                      onChange={(e) => handleInputChange('notifications', 'orderConfirmation', e.target.checked)}
                      className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Status Updates</p>
                      <p className="text-sm text-gray-600">Notify customers about order progress</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.orderStatusUpdates}
                      onChange={(e) => handleInputChange('notifications', 'orderStatusUpdates', e.target.checked)}
                      className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promotional Emails</p>
                      <p className="text-sm text-gray-600">Send special offers and updates</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.promotionalEmails}
                      onChange={(e) => handleInputChange('notifications', 'promotionalEmails', e.target.checked)}
                      className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Admin Notifications */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium text-lg mb-4">Admin Notifications</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Order Alerts</p>
                      <p className="text-sm text-gray-600">Get notified when new orders arrive</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.newOrderAlerts}
                      onChange={(e) => handleInputChange('notifications', 'newOrderAlerts', e.target.checked)}
                      className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Low Stock Alerts</p>
                      <p className="text-sm text-gray-600">Get notified when items are low in stock</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.lowStockAlerts}
                      onChange={(e) => handleInputChange('notifications', 'lowStockAlerts', e.target.checked)}
                      className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Channels */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium text-lg mb-4">Notification Channels</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                      className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.smsNotifications}
                      onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
                      className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Customize the look and feel of your store.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.theme.primaryColor}
                    onChange={(e) => handleInputChange('theme', 'primaryColor', e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={settings.theme.primaryColor}
                    onChange={(e) => handleInputChange('theme', 'primaryColor', e.target.value)}
                    className="flex-1 input-field"
                    placeholder="#f97316"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.theme.secondaryColor}
                    onChange={(e) => handleInputChange('theme', 'secondaryColor', e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={settings.theme.secondaryColor}
                    onChange={(e) => handleInputChange('theme', 'secondaryColor', e.target.value)}
                    className="flex-1 input-field"
                    placeholder="#1f2937"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.theme.backgroundColor}
                    onChange={(e) => handleInputChange('theme', 'backgroundColor', e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={settings.theme.backgroundColor}
                    onChange={(e) => handleInputChange('theme', 'backgroundColor', e.target.value)}
                    className="flex-1 input-field"
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.theme.textColor}
                    onChange={(e) => handleInputChange('theme', 'textColor', e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={settings.theme.textColor}
                    onChange={(e) => handleInputChange('theme', 'textColor', e.target.value)}
                    className="flex-1 input-field"
                    placeholder="#111827"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Radius
              </label>
              <select
                value={settings.theme.borderRadius}
                onChange={(e) => handleInputChange('theme', 'borderRadius', e.target.value)}
                className="w-full input-field"
              >
                <option value="0">None (0)</option>
                <option value="0.25rem">Small (0.25rem)</option>
                <option value="0.5rem">Medium (0.5rem)</option>
                <option value="0.75rem">Large (0.75rem)</option>
                <option value="1rem">Extra Large (1rem)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <select
                value={settings.theme.fontFamily}
                onChange={(e) => handleInputChange('theme', 'fontFamily', e.target.value)}
                className="w-full input-field"
              >
                <option value="Inter, sans-serif">Inter</option>
                <option value="Roboto, sans-serif">Roboto</option>
                <option value="Poppins, sans-serif">Poppins</option>
                <option value="Montserrat, sans-serif">Montserrat</option>
                <option value="Open Sans, sans-serif">Open Sans</option>
                <option value="system-ui, sans-serif">System UI</option>
              </select>
            </div>

            {/* Theme Preview */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-lg mb-4">Theme Preview</h3>
              <div 
                className="p-6 rounded-lg"
                style={{ 
                  backgroundColor: settings.theme.backgroundColor,
                  color: settings.theme.textColor,
                  borderRadius: settings.theme.borderRadius,
                  fontFamily: settings.theme.fontFamily
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold" style={{ color: settings.theme.primaryColor }}>
                    {settings.general.shopName}
                  </h4>
                  <button
                    className="px-4 py-2 rounded font-medium"
                    style={{ 
                      backgroundColor: settings.theme.primaryColor,
                      color: '#ffffff',
                      borderRadius: settings.theme.borderRadius
                    }}
                  >
                    Order Now
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{settings.general.shopDescription}</p>
                <div className="space-y-2">
                  <div className="p-3 rounded" style={{ 
                    backgroundColor: settings.theme.secondaryColor + '10',
                    borderRadius: settings.theme.borderRadius
                  }}>
                    <p className="font-medium">Sample Menu Item</p>
                    <p className="text-sm opacity-75">Delicious food description</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-gray-600">Configure your restaurant settings</p>
        </div>
        
        <button
          onClick={handleSaveSettings}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
        >
          <Save className="h-5 w-5 mr-2" />
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-lg shadow">
        {/* Tab Headers */}
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Save Button at Bottom */}
      <div className="sticky bottom-6 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-medium">Save your changes</p>
            <p className="text-sm text-gray-600">Don't forget to save your settings</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                const defaultSettings = JSON.parse(localStorage.getItem('shopSettings') || '{}');
                setSettings(defaultSettings);
                toast.success('Settings reset');
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={loading}
              className="flex items-center px-6 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? 'Saving Changes...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;