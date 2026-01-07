import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import MenuItem from '../models/MenuItem.js';

dotenv.config();

const categories = [
  {
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop'
  },
  {
    name: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w-800&auto=format&fit=crop'
  },
  {
    name: 'Pasta',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop'
  },
  {
    name: 'Salad',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop'
  },
  {
    name: 'Drinks',
    image: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=800&auto=format&fit=crop'
  },
  {
    name: 'Dessert',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop'
  }
];

const menuItems = [
  // Pizza
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil',
    price: 12.99,
    category: null, // Will be set dynamically
    isTopSelling: true,
    isAvailable: true
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Pizza topped with pepperoni slices and mozzarella cheese',
    price: 14.99,
    category: null,
    isTopSelling: true,
    isAvailable: true
  },
  // Burger
  {
    name: 'Classic Cheeseburger',
    description: 'Beef patty with cheese, lettuce, tomato, and special sauce',
    price: 9.99,
    category: null,
    isTopSelling: true,
    isAvailable: true
  },
  {
    name: 'Chicken Burger',
    description: 'Grilled chicken breast with mayo, lettuce, and pickles',
    price: 8.99,
    category: null,
    isTopSelling: false,
    isAvailable: true
  },
  // Pasta
  {
    name: 'Spaghetti Carbonara',
    description: 'Pasta with eggs, cheese, pancetta, and black pepper',
    price: 11.99,
    category: null,
    isTopSelling: true,
    isAvailable: true
  },
  {
    name: 'Lasagna',
    description: 'Layered pasta with meat sauce, cheese, and béchamel',
    price: 13.99,
    category: null,
    isTopSelling: false,
    isAvailable: true
  },
  // Salad
  {
    name: 'Caesar Salad',
    description: 'Romaine lettuce with croutons, parmesan, and caesar dressing',
    price: 8.99,
    category: null,
    isTopSelling: true,
    isAvailable: true
  },
  // Drinks
  {
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 3.99,
    category: null,
    isTopSelling: true,
    isAvailable: true
  },
  {
    name: 'Iced Tea',
    description: 'Refreshing iced tea with lemon',
    price: 2.99,
    category: null,
    isTopSelling: false,
    isAvailable: true
  },
  // Dessert
  {
    name: 'Chocolate Brownie',
    description: 'Warm chocolate brownie with ice cream',
    price: 6.99,
    category: null,
    isTopSelling: true,
    isAvailable: true
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await MenuItem.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
    const adminUser = new User({
      name: process.env.ADMIN_NAME || 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@foodexpress.com',
      phone: process.env.ADMIN_PHONE || '+1234567890',
      password: hashedPassword,
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created:', adminUser.email);

    // Create categories
    const createdCategories = [];
    for (const catData of categories) {
      const category = new Category(catData);
      await category.save();
      createdCategories.push(category);
      console.log(`Created category: ${category.name}`);
    }

    // Create menu items
    let itemIndex = 0;
    for (const cat of createdCategories) {
      // Assign 1-2 items per category
      const itemsForCategory = menuItems.slice(itemIndex, itemIndex + 2);
      for (const itemData of itemsForCategory) {
        const menuItem = new MenuItem({
          ...itemData,
          category: cat._id,
          image: cat.image // Using category image for simplicity
        });
        await menuItem.save();
        console.log(`Created menu item: ${menuItem.name} (${cat.name})`);
      }
      itemIndex += 2;
    }

    // Create a test customer
    const customerPassword = await bcrypt.hash('password123', 10);
    const customer = new User({
      name: 'Test Customer',
      email: 'customer@test.com',
      phone: '+1234567891',
      password: customerPassword,
      role: 'customer',
      address: {
        street: '123 Test Street',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345'
      }
    });
    await customer.save();
    console.log('Test customer created:', customer.email);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();