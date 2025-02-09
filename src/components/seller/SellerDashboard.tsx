import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { useSeller } from "@/hooks/useSeller";
import { formatCurrency } from "@/lib/utils/format";
import { Car, DollarSign, Users, Star, FileText, Settings } from "lucide-react";

export function SellerDashboard() {
  const { profile, analytics, loading } = useSeller();

  if (loading) return <div>Loading...</div>;

  const stats = [
    {
      label: "Active Listings",
      value: profile?.total_listings || 0,
      icon: Car,
    },
    {
      label: "Total Revenue",
      value: formatCurrency(profile?.total_revenue || 0),
      icon: DollarSign,
    },
    {
      label: "Total Views",
      value: profile?.total_views || 0,
      icon: Users,
    },
    {
      label: "Average Rating",
      value: profile?.rating?.toFixed(1) || "0.0",
      icon: Star,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center gap-4">
              <stat.icon className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalyticsChart
              data={analytics}
              title="Views Over Time"
              onPeriodChange={() => {}}
            />
            <AnalyticsChart
              data={analytics}
              title="Revenue Over Time"
              onPeriodChange={() => {}}
            />
          </div>
        </TabsContent>

        <TabsContent value="listings">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Your Listings</h2>
              <Button>
                <FileText className="h-4 w-4 mr-2" /> Create New Listing
              </Button>
            </div>
            {/* Add VehicleGrid component here */}
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Business Documents</h2>
              <Button>
                <FileText className="h-4 w-4 mr-2" /> Upload Document
              </Button>
            </div>
            {/* Add document list/grid here */}
          </Card>
        </TabsContent>

        <TabsContent value="payouts">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Payout History</h2>
              <Button>
                <DollarSign className="h-4 w-4 mr-2" /> Request Payout
              </Button>
            </div>
            {/* Add payout history table here */}
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Business Settings</h2>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
            {/* Add settings form here */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
