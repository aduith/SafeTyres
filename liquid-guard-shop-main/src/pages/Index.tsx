import Hero from '@/components/Hero';
import ProductCarousel from '@/components/ProductCarousel';
import ProductCard from '@/components/ProductCard';
import ProductAdvantages from '@/components/ProductAdvantages';
import UsageInstructions from '@/components/UsageInstructions';
import ReviewsSection from '@/components/ReviewsSection';
import FeedbackForm from '@/components/FeedbackForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import product200ml from '@/assets/product-200ml.png';
import product300ml from '@/assets/product-300ml.png';
import product500ml from '@/assets/product-500ml.png';
import product1l from '@/assets/product-1l.png';

const Index = () => {
  const featuredProducts = [
    {
      id: 'product-300ml',
      name: 'Tyre Anti-Puncture Liquid',
      size: '300ml',
      price: 17.99,
      image: product300ml,
      popular: true,
    },
    {
      id: 'product-500ml',
      name: 'Tyre Anti-Puncture Liquid',
      size: '500ml',
      price: 24.99,
      image: product500ml,
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero />

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              Featured <span className="text-primary">Products</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Our most popular sizes for everyday protection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
      
      <ProductCarousel />
      
      <ProductAdvantages />
      
      <UsageInstructions />

      <ReviewsSection />
      
      <FeedbackForm />
      
      <Footer />
    </div>
  );
};

export default Index;
