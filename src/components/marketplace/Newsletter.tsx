import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <Mail className="h-12 w-12 mx-auto text-primary" />
          <h2 className="text-3xl font-bold">Stay Updated</h2>
          <p className="text-muted-foreground">
            Subscribe to our newsletter for the latest car deals, automotive
            news, and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
