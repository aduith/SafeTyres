import dotenv from 'dotenv';
import connectDB from '../config/database';
import Product from '../models/Product';
import User from '../models/User';

dotenv.config();

const products = [
    {
        name: 'Tyre Anti-Puncture Liquid',
        description: 'Professional-grade tyre sealant that prevents and repairs punctures instantly. Safe for all tyre types.',
        size: '200ml',
        price: 12.99,
        image: '/assets/product-200ml.png',
        stock: 100,
        popular: false,
        features: [
            'Instant puncture repair',
            'Eco-friendly formula',
            'Works with all tyre types',
            'Long-lasting protection',
        ],
    },
    {
        name: 'Tyre Anti-Puncture Liquid',
        description: 'Our most popular size! Professional-grade tyre sealant for everyday protection.',
        size: '300ml',
        price: 17.99,
        image: '/assets/product-300ml.png',
        stock: 150,
        popular: true,
        features: [
            'Instant puncture repair',
            'Eco-friendly formula',
            'Works with all tyre types',
            'Long-lasting protection',
        ],
    },
    {
        name: 'Tyre Anti-Puncture Liquid',
        description: 'Premium protection for your vehicle. Best value for money!',
        size: '500ml',
        price: 24.99,
        image: '/assets/product-500ml.png',
        stock: 120,
        popular: true,
        features: [
            'Instant puncture repair',
            'Eco-friendly formula',
            'Works with all tyre types',
            'Long-lasting protection',
        ],
    },
    {
        name: 'Tyre Anti-Puncture Liquid',
        description: 'Maximum protection for heavy-duty vehicles and commercial use.',
        size: '1L',
        price: 39.99,
        image: '/assets/product-1l.png',
        stock: 80,
        popular: false,
        features: [
            'Instant puncture repair',
            'Eco-friendly formula',
            'Works with all tyre types',
            'Long-lasting protection',
            'Commercial grade',
        ],
    },
];

const adminUser = {
    name: 'Admin',
    email: 'admin@safeTyres.com',
    password: 'admin123',
    role: 'admin' as const,
};

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log('🗑️  Clearing existing data...');
        await Product.deleteMany({});
        await User.deleteMany({});

        console.log('📦 Seeding products...');
        await Product.insertMany(products);
        console.log(`✅ ${products.length} products created`);

        console.log('👤 Creating admin user...');
        await User.create(adminUser);
        console.log('✅ Admin user created');
        console.log('   Email: admin@safeTyres.com');
        console.log('   Password: admin123');

        console.log('\n🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
