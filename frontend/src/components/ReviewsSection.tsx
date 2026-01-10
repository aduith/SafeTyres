import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const ReviewsSection = () => {
  const reviews = [
    {
      name: 'John Mitchell',
      rating: 5,
      comment: 'This product saved me from multiple punctures! Highly recommend for daily commuters.',
      date: 'March 2024',
    },
    {
      name: 'Sarah Chen',
      rating: 5,
      comment: 'Easy to apply and works like magic. No more worries about flat tyres during long trips.',
      date: 'February 2024',
    },
    {
      name: 'David Rodriguez',
      rating: 5,
      comment: 'Professional quality product at a great price. My fleet vehicles have been running smoothly.',
      date: 'January 2024',
    },
    {
      name: 'Emma Williams',
      rating: 4,
      comment: 'Great protection for my car tyres. Installation was straightforward and effective.',
      date: 'December 2023',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Customer <span className="text-primary">Reviews</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our satisfied customers have to say
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="group hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
