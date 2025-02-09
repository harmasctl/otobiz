import React from "react";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Settings, Car, Bell } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      label: "Saved Vehicles",
      value: 12,
      icon: Heart,
      href: "/dashboard/saved",
    },
    {
      label: "My Listings",
      value: 3,
      icon: Car,
      href: "/dashboard/listings",
    },
    {
      label: "Notifications",
      value: 5,
      icon: Bell,
      href: "/dashboard/notifications",
    },
    {
      label: "Settings",
      value: null,
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">
          Manage your vehicles and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <Button
              variant="ghost"
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              asChild
            >
              <a href={stat.href}>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
                <div className="text-lg font-semibold">{stat.value ?? ""}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </a>
            </Button>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Add activity items here */}
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        </Card>

        {/* Saved Searches */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Saved Searches</h2>
          <div className="space-y-4">
            {/* Add saved searches here */}
            <p className="text-muted-foreground">No saved searches</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
