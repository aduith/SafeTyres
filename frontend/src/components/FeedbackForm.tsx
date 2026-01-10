import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your feedback!', {
      description: 'We will get back to you soon.',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto border-border shadow-glow animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">
              Share Your <span className="text-primary">Feedback</span>
            </CardTitle>
            <CardDescription className="text-base">
              We'd love to hear from you. Send us your thoughts or questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you think..."
                  required
                  rows={5}
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Send Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeedbackForm;
