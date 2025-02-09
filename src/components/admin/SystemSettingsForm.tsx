import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { SystemSettings } from "@/hooks/useAdmin";

interface SystemSettingsFormProps {
  settings: SystemSettings;
  onSave: (settings: SystemSettings) => void;
}

interface SystemSettings {
  id: number;
  site_name: string;
  maintenance_mode: boolean;
  allowed_file_types: string[];
  max_file_size: number;
  featured_listing_price: number;
  commission_rate: number;
  default_currency: string;
  smtp_settings: {
    host: string;
    port: number;
    user: string;
    password: string;
    from_email: string;
    from_name: string;
  };
}

export function SystemSettingsForm({
  settings,
  onSave,
}: SystemSettingsFormProps) {
  const [formData, setFormData] = React.useState(
    settings || {
      id: 1,
      site_name: "Otobiz",
      maintenance_mode: false,
      allowed_file_types: ["image/jpeg", "image/png", "image/webp"],
      max_file_size: 5242880,
      featured_listing_price: 49.99,
      commission_rate: 5.0,
      default_currency: "USD",
      smtp_settings: {
        host: "",
        port: 587,
        user: "",
        password: "",
        from_email: "",
        from_name: "",
      },
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-semibold">General Settings</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="site_name">Site Name</Label>
              <Input
                id="site_name"
                value={formData.site_name}
                onChange={(e) =>
                  setFormData({ ...formData, site_name: e.target.value })
                }
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="maintenance_mode"
                checked={formData.maintenance_mode}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, maintenance_mode: checked })
                }
              />
              <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
            </div>

            <div>
              <Label htmlFor="featured_price">Featured Listing Price</Label>
              <Input
                id="featured_price"
                type="number"
                value={formData.featured_listing_price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    featured_listing_price: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="commission">Commission Rate (%)</Label>
              <Input
                id="commission"
                type="number"
                value={formData.commission_rate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    commission_rate: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="max_file_size">Max File Size (bytes)</Label>
              <Input
                id="max_file_size"
                type="number"
                value={formData.max_file_size}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    max_file_size: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-semibold">Email Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtp_host">SMTP Host</Label>
              <Input
                id="smtp_host"
                value={formData.smtp_settings.host}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    smtp_settings: {
                      ...formData.smtp_settings,
                      host: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="smtp_port">SMTP Port</Label>
              <Input
                id="smtp_port"
                type="number"
                value={formData.smtp_settings.port}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    smtp_settings: {
                      ...formData.smtp_settings,
                      port: parseInt(e.target.value),
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="smtp_user">SMTP User</Label>
              <Input
                id="smtp_user"
                value={formData.smtp_settings.user}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    smtp_settings: {
                      ...formData.smtp_settings,
                      user: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="smtp_password">SMTP Password</Label>
              <Input
                id="smtp_password"
                type="password"
                value={formData.smtp_settings.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    smtp_settings: {
                      ...formData.smtp_settings,
                      password: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="from_email">From Email</Label>
              <Input
                id="from_email"
                type="email"
                value={formData.smtp_settings.from_email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    smtp_settings: {
                      ...formData.smtp_settings,
                      from_email: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="from_name">From Name</Label>
              <Input
                id="from_name"
                value={formData.smtp_settings.from_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    smtp_settings: {
                      ...formData.smtp_settings,
                      from_name: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Save All Settings
          </Button>
        </div>
      </div>
    </form>
  );
}
