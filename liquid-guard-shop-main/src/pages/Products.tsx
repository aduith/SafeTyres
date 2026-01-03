import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import product200ml from '@/assets/product-200ml.png';
import product300ml from '@/assets/product-300ml.png';
import product500ml from '@/assets/product-500ml.png';
import product1l from '@/assets/product-1l.png';

const Products = () => {
  const products = [
    {
      id: 'product-200ml',
      name: 'Tyre Anti-Puncture Liquid',
      size: '200ml',
      price: 12.99,
      image: product200ml,
    },
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
    {
      id: 'product-1l',
      name: 'Tyre Anti-Puncture Liquid',
      size: '1L',
      price: 39.99,
      image: product1l,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="text-primary">Products</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Choose the perfect size for your vehicle. All sizes provide the same premium protection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Product Features */}
            <div className="mt-20 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Why Choose <span className="text-primary">SafeTyres</span>?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Professional Grade',
                    desc: 'Used by automotive professionals worldwide',
                  },
                  {
                    title: 'Eco-Friendly Formula',
                    desc: 'Safe for tyres and the environment',
                  },
                  {
                    title: 'Long-Lasting Protection',
                    desc: 'Lasts for the entire life of your tyre',
                  },
                  {
                    title: 'Universal Compatibility',
                    desc: 'Works with all tyre types and sizes',
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
