import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { adminApi } from "@/lib/api/admin";
import { Shield, Zap, FileText, Upload, Check } from "lucide-react";

export default function BecomeSeller() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    businessName: "",
    businessDescription: "",
    businessAddress: "",
    businessPhone: "",
    businessLicense: "",
    agreeToTerms: false,
  });
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBecomeSeller = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await adminApi.sendInvite(user.email);
      setShowSuccess(true);
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Business Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="businessDescription">
                  Business Description
                </Label>
                <Textarea
                  id="businessDescription"
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="businessAddress">Business Address</Label>
                <Input
                  id="businessAddress"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="businessPhone">Business Phone</Label>
                <Input
                  id="businessPhone"
                  name="businessPhone"
                  type="tel"
                  value={formData.businessPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button
                className="w-full"
                onClick={() => setStep(2)}
                disabled={
                  !formData.businessName ||
                  !formData.businessDescription ||
                  !formData.businessAddress ||
                  !formData.businessPhone
                }
              >
                Next Step
              </Button>
            </div>
          </Card>
        );
      case 2:
        return (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Documentation</h2>
            <div className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="font-medium">Upload Business License</h3>
                  <p className="text-sm text-muted-foreground">
                    PDF, JPG, or PNG files up to 10MB
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    Select File
                  </Button>
                </div>
                {uploadedFiles.map((file) => (
                  <div key={file.name} className="flex items-center gap-2 mt-4">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      agreeToTerms: checked as boolean,
                    }))
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground"
                >
                  I agree to the terms and conditions
                </label>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Previous Step
                </Button>
                <Button
                  onClick={handleBecomeSeller}
                  disabled={
                    !formData.agreeToTerms ||
                    loading ||
                    uploadedFiles.length === 0
                  }
                >
                  {loading ? "Processing..." : "Submit Application"}
                </Button>
              </div>
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

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

      {renderStep()}

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
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
            <DialogDescription asChild>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Your seller application has been submitted successfully. Our
                team will review your application and get back to you within 2-3
                business days.
              </motion.p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
