import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { SellerProfile } from "@/types/database";

interface SellerSettingsFormProps {
  profile: SellerProfile;
  onSave: (updates: Partial<SellerProfile>) => Promise<void>;
}

export function SellerSettingsForm({
  profile,
  onSave,
}: SellerSettingsFormProps) {
  const [formData, setFormData] = React.useState({
    business_name: profile.business_name || "",
    business_description: profile.business_description || "",
    business_address: profile.business_address || "",
    business_phone: profile.business_phone || "",
    business_email: profile.business_email || "",
    business_hours: profile.business_hours || {},
    social_media: profile.social_media || {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Business Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="business_name">Business Name</Label>
            <Input
              id="business_name"
              value={formData.business_name}
              onChange={(e) =>
                setFormData({ ...formData, business_name: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="business_email">Business Email</Label>
            <Input
              id="business_email"
              type="email"
              value={formData.business_email}
              onChange={(e) =>
                setFormData({ ...formData, business_email: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="business_phone">Business Phone</Label>
            <Input
              id="business_phone"
              value={formData.business_phone}
              onChange={(e) =>
                setFormData({ ...formData, business_phone: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="business_address">Business Address</Label>
            <Input
              id="business_address"
              value={formData.business_address}
              onChange={(e) =>
                setFormData({ ...formData, business_address: e.target.value })
              }
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="business_description">Business Description</Label>
            <Textarea
              id="business_description"
              value={formData.business_description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  business_description: e.target.value,
                })
              }
              rows={4}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Social Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              value={formData.social_media.facebook}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  social_media: {
                    ...formData.social_media,
                    facebook: e.target.value,
                  },
                })
              }
              placeholder="Facebook URL"
            />
          </div>

          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              value={formData.social_media.twitter}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  social_media: {
                    ...formData.social_media,
                    twitter: e.target.value,
                  },
                })
              }
              placeholder="Twitter URL"
            />
          </div>

          <div>
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={formData.social_media.instagram}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  social_media: {
                    ...formData.social_media,
                    instagram: e.target.value,
                  },
                })
              }
              placeholder="Instagram URL"
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
