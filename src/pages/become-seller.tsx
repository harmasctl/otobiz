import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { adminApi } from "@/lib/api/admin";
import { Shield, Zap, FileText } from "lucide-react";

export default function BecomeSeller() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleBecomeSeller = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await adminApi.sendInvite(user.email);
      setShowSuccess(true);
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error becoming seller:", error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Verified Seller Status",
      description: "Get a verified badge and build trust with buyers",
    },
    {
      icon: Zap,
      title: "Powerful Tools",
      description: "Access to advanced listing and analytics tools",
    },
    {
      icon: FileText,
      title: "Business Dashboard",
      description: "Manage your inventory, leads, and sales in one place",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Become a Seller</h1>
        <p className="text-xl text-muted-foreground">
          Start selling your vehicles on our platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => (
          <Card key={feature.title} className="p-6">
            <feature.icon className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>

      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-6">
          Join our community of trusted sellers and reach thousands of potential
          buyers.
        </p>
        <Button size="lg" onClick={handleBecomeSeller} disabled={loading}>
          {loading ? "Processing..." : "Become a Seller"}
        </Button>
      </Card>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2"
              >
                <Shield className="h-6 w-6 text-primary" />
                Application Submitted
              </motion.div>
            </DialogTitle>
            <DialogDescription>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Your seller application has been submitted. You will be notified
                once approved.
              </motion.div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
