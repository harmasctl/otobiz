import React from "react";
import { Button } from "@/components/ui/button";
import { Apple, Smartphone } from "lucide-react";

const AppPromotion = () => {
  return (
    <div className="relative overflow-hidden bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Download Our Mobile App</h2>
            <p className="text-lg text-white/80">
              Get the best car deals right in your pocket. Browse, compare, and
              contact sellers on the go.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="secondary"
                className="flex items-center gap-2"
                size="lg"
              >
                <Apple className="h-5 w-5" />
                App Store
              </Button>
              <Button
                variant="secondary"
                className="flex items-center gap-2"
                size="lg"
              >
                <Smartphone className="h-5 w-5" />
                Google Play
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&h=600&fit=crop"
              alt="Mobile App"
              className="rounded-lg shadow-2xl transform md:translate-x-10 md:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPromotion;
