// Generate random order ID
export const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${random}`.toUpperCase();
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Calculate estimated delivery time
export const calculateDeliveryTime = (orderType) => {
  const now = new Date();
  if (orderType === 'pickup') {
    now.setMinutes(now.getMinutes() + 15); // 15 minutes for pickup
  } else {
    now.setMinutes(now.getMinutes() + 30); // 30 minutes for delivery
  }
  return now;
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate random password
export const generateRandomPassword = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Calculate order total with tax and delivery
export const calculateOrderTotal = (subtotal, orderType) => {
  const TAX_RATE = 0.08; // 8% tax
  const DELIVERY_FEE = 2.99;
  const FREE_DELIVERY_THRESHOLD = 20;

  const tax = subtotal * TAX_RATE;
  const deliveryFee = orderType === 'delivery' && subtotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
  
  return {
    subtotal,
    tax,
    deliveryFee,
    total: subtotal + tax + deliveryFee
  };
};

// Format date
export const formatDate = (date, format = 'short') => {
  const dateObj = new Date(date);
  
  if (format === 'short') {
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
  
  if (format === 'long') {
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return dateObj.toISOString();
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};