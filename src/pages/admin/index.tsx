import React from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Users</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-muted-foreground">
            Total registered users
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Vehicles</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-muted-foreground">Total listed vehicles</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Dealers</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-muted-foreground">Verified dealers</p>
        </Card>
      </div>
    </div>
  );
}
