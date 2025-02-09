import React from "react";
import HeroSection from "./marketplace/HeroSection";
import VehicleGrid from "./marketplace/VehicleGrid";
import BrandCard from "./marketplace/BrandCard";
import BodyTypeCard from "./marketplace/BodyTypeCard";
import NewsCard from "./marketplace/NewsCard";
import FinanceCalculator from "./marketplace/FinanceCalculator";
import FeatureCard from "./marketplace/FeatureCard";
import ReviewCard from "./marketplace/ReviewCard";
import AppPromotion from "./marketplace/AppPromotion";
import Newsletter from "./marketplace/Newsletter";
import { Button } from "@/components/ui/button";
import { Shield, Zap, FileText, Headphones } from "lucide-react";
import Footer from "./layout/Footer";

// Rest of the imports...

const Home = () => {
  const [favorites, setFavorites] = React.useState<string[]>([]);

  const handleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      {/* Popular Brands */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Popular Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              {
                name: "Toyota",
                logo: "https://api.dicebear.com/7.x/initials/svg?seed=Toyota",
                modelCount: 24,
              },
              {
                name: "Honda",
                logo: "https://api.dicebear.com/7.x/initials/svg?seed=Honda",
                modelCount: 18,
              },
              {
                name: "Ford",
                logo: "https://api.dicebear.com/7.x/initials/svg?seed=Ford",
                modelCount: 20,
              },
              {
                name: "BMW",
                logo: "https://api.dicebear.com/7.x/initials/svg?seed=BMW",
                modelCount: 15,
              },
              {
                name: "Mercedes",
                logo: "https://api.dicebear.com/7.x/initials/svg?seed=Mercedes",
                modelCount: 16,
              },
              {
                name: "Audi",
                logo: "https://api.dicebear.com/7.x/initials/svg?seed=Audi",
                modelCount: 14,
              },
            ].map((brand) => (
              <BrandCard key={brand.name} {...brand} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Featured Vehicles</h2>
          <VehicleGrid />
        </div>
      </section>

      {/* Browse by Body Type */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Browse by Body Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "SUV",
                count: 156,
                image:
                  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
              },
              {
                name: "Sedan",
                count: 89,
                image:
                  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop",
              },
              {
                name: "Hatchback",
                count: 45,
                image:
                  "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=400&h=300&fit=crop",
              },
              {
                name: "Truck",
                count: 78,
                image:
                  "https://images.unsplash.com/photo-1558383331-f520f2888351?w=400&h=300&fit=crop",
              },
            ].map((type) => (
              <BodyTypeCard key={type.name} {...type} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Shield}
              title="Secure Transactions"
              description="Safe and secure payment processing for all transactions"
            />
            <FeatureCard
              icon={Zap}
              title="Fast & Easy"
              description="Quick and simple process to buy or sell vehicles"
            />
            <FeatureCard
              icon={FileText}
              title="Verified Listings"
              description="All vehicles are verified by our expert team"
            />
            <FeatureCard
              icon={Headphones}
              title="24/7 Support"
              description="Round-the-clock customer support for all your needs"
            />
          </div>
        </div>
      </section>

      {/* Finance Calculator */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Calculate Your Finance
              </h2>
              <p className="text-muted-foreground mb-8">
                Use our finance calculator to estimate your monthly payments
              </p>
              <FinanceCalculator />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Latest Reviews</h2>
              <div className="space-y-4">
                {[
                  {
                    name: "John Doe",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                    rating: 5,
                    date: "2 days ago",
                    review:
                      "Great experience buying my new car. The process was smooth and the staff was very helpful.",
                    carModel: "2023 Toyota Camry",
                  },
                  {
                    name: "Jane Smith",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
                    rating: 4,
                    date: "1 week ago",
                    review:
                      "Very satisfied with my purchase. The car was exactly as described.",
                    carModel: "2022 Honda Civic",
                  },
                ].map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Latest Automotive News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=400&fit=crop",
                title: "The Future of Electric Vehicles",
                category: "Industry News",
                date: "March 15, 2024",
                excerpt:
                  "Explore the latest trends and developments in the electric vehicle market.",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&h=400&fit=crop",
                title: "Top Safety Features in 2024",
                category: "Car Tech",
                date: "March 12, 2024",
                excerpt:
                  "Discover the most advanced safety features in modern vehicles.",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1537984822441-cff330075342?w=800&h=400&fit=crop",
                title: "Maintenance Tips for Your Car",
                category: "Tips & Advice",
                date: "March 10, 2024",
                excerpt:
                  "Essential maintenance tips to keep your car running smoothly.",
              },
            ].map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
        </div>
      </section>

      <AppPromotion />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
