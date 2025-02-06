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
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const brands = [
  {
    name: "Toyota",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=toyota",
    modelCount: 24,
  },
  {
    name: "BMW",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=bmw",
    modelCount: 18,
  },
  {
    name: "Mercedes",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=mercedes",
    modelCount: 22,
  },
  {
    name: "Audi",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=audi",
    modelCount: 16,
  },
  {
    name: "Honda",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=honda",
    modelCount: 12,
  },
  {
    name: "Ford",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=ford",
    modelCount: 15,
  },
];

const hotDeals = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&h=600&fit=crop",
    title: "BMW 3 Series M Sport",
    monthlyPrice: 399,
    initialPayment: 3999,
    contractLength: 36,
    year: 2023,
    mileage: 0,
    fuelType: "Hybrid",
    transmission: "Automatic",
    engineSize: "2.0L",
    power: "258 HP",
    rating: 4.8,
    isNew: true,
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&h=600&fit=crop",
    title: "Mercedes A-Class AMG Line",
    monthlyPrice: 375,
    initialPayment: 3750,
    contractLength: 24,
    year: 2023,
    mileage: 0,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "2.0L",
    power: "224 HP",
    rating: 4.7,
    isNew: true,
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    title: "Audi Q3 Sportback S-Line",
    monthlyPrice: 425,
    initialPayment: 4250,
    contractLength: 36,
    year: 2023,
    mileage: 0,
    fuelType: "Diesel",
    transmission: "Automatic",
    engineSize: "2.0L",
    power: "204 HP",
    rating: 4.6,
    isNew: true,
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&h=600&fit=crop",
    title: "Range Rover Evoque R-Dynamic",
    monthlyPrice: 499,
    initialPayment: 4990,
    contractLength: 24,
    year: 2023,
    mileage: 0,
    fuelType: "PHEV",
    transmission: "Automatic",
    engineSize: "1.5L",
    power: "309 HP",
    rating: 4.9,
    isNew: true,
  },
];

const bodyTypes = [
  {
    name: "SUV",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop",
    count: 1234,
  },
  {
    name: "Hatchback",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop",
    count: 890,
  },
  {
    name: "Sedan",
    image:
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&h=600&fit=crop",
    count: 567,
  },
  {
    name: "Electric",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop",
    count: 345,
  },
];

const news = [
  {
    image:
      "https://images.unsplash.com/photo-1621248861137-53dc5447c8c8?w=800&h=400&fit=crop",
    title: "The Future of Electric Vehicles in Senegal",
    category: "Industry News",
    date: "2 days ago",
    excerpt:
      "Exploring the growing trend of electric vehicles and their impact on Senegal's automotive market.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=400&fit=crop",
    title: "Top 10 Most Popular Cars of 2024",
    category: "Reviews",
    date: "4 days ago",
    excerpt:
      "We break down the best-selling vehicles and what makes them stand out from the competition.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=400&fit=crop",
    title: "Maintenance Tips for Your New Car",
    category: "Guides",
    date: "1 week ago",
    excerpt:
      "Essential maintenance tips to keep your vehicle running smoothly and maintain its value.",
  },
];

const Home = () => {
  const [favorites, setFavorites] = React.useState<string[]>([]);

  const handleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={{
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        }}
      />
      <HeroSection />

      {/* Hot Deals Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold">Hot Deals This Week</h2>
            <p className="text-muted-foreground mt-2">
              Exclusive offers you can't miss
            </p>
          </div>
          <Button variant="link" className="text-blue-600">
            View all deals →
          </Button>
        </div>
        <VehicleGrid
          vehicles={hotDeals}
          onVehicleClick={(id) => console.log(`Clicked vehicle ${id}`)}
          onFavorite={handleFavorite}
        />
      </section>

      {/* Popular Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Popular Features</h2>
          <p className="text-muted-foreground mt-2">
            Discover what makes us special
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "Verified Dealers",
              description:
                "All our dealers are thoroughly vetted and verified for your peace of mind.",
            },
            {
              icon: Zap,
              title: "Instant Booking",
              description:
                "Book a test drive instantly with our real-time availability system.",
            },
            {
              icon: FileText,
              title: "Vehicle History",
              description:
                "Get detailed vehicle history reports for every car in our inventory.",
            },
            {
              icon: Headphones,
              title: "24/7 Support",
              description:
                "Our customer support team is always here to help you.",
            },
          ].map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Browse by Body Type */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Browse by Body Type</h2>
          <p className="text-muted-foreground mt-2">
            Find the perfect car for your lifestyle
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bodyTypes.map((type) => (
            <BodyTypeCard
              key={type.name}
              {...type}
              onClick={() => console.log(`Clicked ${type.name}`)}
            />
          ))}
        </div>
      </section>

      {/* Browse by Brand */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Browse by Brand</h2>
          <p className="text-muted-foreground mt-2">
            Find your favorite manufacturer
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <BrandCard
              key={brand.name}
              {...brand}
              onClick={() => console.log(`Clicked ${brand.name}`)}
            />
          ))}
        </div>
      </section>

      {/* Finance Calculator and News Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Finance Calculator */}
          <div className="lg:col-span-1">
            <FinanceCalculator className="h-full" />
          </div>

          {/* Latest News & Reviews */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Latest News & Reviews</h2>
              <p className="text-muted-foreground mt-2">
                Stay updated with the latest automotive news
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item, index) => (
                <NewsCard
                  key={index}
                  {...item}
                  onClick={() => console.log(`Clicked news: ${item.title}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          <p className="text-muted-foreground mt-2">
            Real experiences from real car buyers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
              name: "John Smith",
              rating: 5,
              date: "2 weeks ago",
              review:
                "Excellent service! Found my dream car at a great price. The whole process was smooth and transparent.",
              carModel: "BMW 3 Series",
            },
            {
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
              name: "Sarah Johnson",
              rating: 4,
              date: "1 month ago",
              review:
                "Very helpful staff and great selection of cars. The finance options were clearly explained.",
              carModel: "Mercedes A-Class",
            },
            {
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
              name: "Michael Brown",
              rating: 5,
              date: "3 weeks ago",
              review:
                "The best car buying experience I've ever had. Everything was straightforward and professional.",
              carModel: "Audi Q3",
            },
          ].map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </section>

      {/* App Promotion */}
      <AppPromotion />

      {/* Newsletter */}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
