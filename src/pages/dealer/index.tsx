import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Car, DollarSign, Users, TrendingUp } from "lucide-react";

export default function DealerDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      label: "Active Listings",
      value: 24,
      icon: Car,
      change: "+2 from last month",
      trend: "up",
    },
    {
      label: "Total Views",
      value: "2.4K",
      icon: Users,
      change: "+20% from last month",
      trend: "up",
    },
    {
      label: "Total Sales",
      value: "12",
      icon: DollarSign,
      change: "+3 from last month",
      trend: "up",
    },
    {
      label: "Conversion Rate",
      value: "3.2%",
      icon: TrendingUp,
      change: "+0.5% from last month",
      trend: "up",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dealer Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your dealership and listings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className="h-8 w-8 text-muted-foreground" />
              <span
                className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Inquiries</h2>
          <div className="space-y-4">
            {/* Add inquiry items here */}
            <p className="text-muted-foreground">No recent inquiries</p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
          <div className="space-y-4">
            {/* Add performance metrics here */}
            <p className="text-muted-foreground">No data available</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
