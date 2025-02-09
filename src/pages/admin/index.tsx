import React from "react";
import { ActivityLogsTable } from "@/components/admin/ActivityLogsTable";
import { ReportedContentTable } from "@/components/admin/ReportedContentTable";
import { SystemSettingsForm } from "@/components/admin/SystemSettingsForm";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { InviteForm } from "@/components/admin/InviteForm";
import { EmailTemplateEditor } from "@/components/admin/EmailTemplateEditor";
import { Vehicle } from "@/types/database";
import { useAdmin } from "@/hooks/useAdmin";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils/format";
import {
  Users,
  Car,
  Star,
  MoreVertical,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";

export default function AdminDashboard() {
  const {
    stats,
    users,
    vehicles,
    loading,
    updateUserRole,
    verifyUser,
    updateVehicleStatus,
    toggleFeatured,
    activityLogs,
    reportedContent,
    handleReport,
    systemSettings,
    updateSettings,
    analyticsData,
    fetchAnalytics,
    sendInvite,
    emailTemplates,
    createEmailTemplate,
    updateEmailTemplate,
    deleteEmailTemplate,
  } = useAdmin();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Car className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Active Listings</p>
              <p className="text-2xl font-bold">{stats?.activeListings || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Star className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Featured Listings</p>
              <p className="text-2xl font-bold">
                {stats?.featuredListings || 0}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="invites">Invites</TabsTrigger>
          <TabsTrigger value="emails">Email Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <AnalyticsChart
              data={analyticsData?.users}
              title="User Growth"
              onPeriodChange={(period) => fetchAnalytics(period as any)}
            />
            <AnalyticsChart
              data={analyticsData?.revenue}
              title="Revenue"
              onPeriodChange={(period) => fetchAnalytics(period as any)}
            />
            <AnalyticsChart
              data={analyticsData?.listings}
              title="Listings"
              onPeriodChange={(period) => fetchAnalytics(period as any)}
            />
            <AnalyticsChart
              data={analyticsData?.engagement}
              title="User Engagement"
              onPeriodChange={(period) => fetchAnalytics(period as any)}
            />
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.full_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === "admin" ? "default" : "secondary"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.is_verified ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => updateUserRole(user.id, "user")}
                          >
                            Set as User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateUserRole(user.id, "dealer")}
                          >
                            Set as Dealer
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateUserRole(user.id, "admin")}
                          >
                            Set as Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              verifyUser(user.id, !user.is_verified)
                            }
                          >
                            {user.is_verified ? "Unverify" : "Verify"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Listed</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </TableCell>
                    <TableCell>{vehicle.seller?.full_name}</TableCell>
                    <TableCell>{formatCurrency(vehicle.price)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          vehicle.status === "active"
                            ? "default"
                            : vehicle.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {vehicle.is_featured ? (
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      ) : (
                        <Star className="h-5 w-5 text-gray-300" />
                      )}
                    </TableCell>
                    <TableCell>{formatDate(vehicle.created_at)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              updateVehicleStatus(vehicle.id, "active")
                            }
                          >
                            Set Active
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateVehicleStatus(vehicle.id, "pending")
                            }
                          >
                            Set Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateVehicleStatus(vehicle.id, "inactive")
                            }
                          >
                            Set Inactive
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              toggleFeatured(vehicle.id, !vehicle.is_featured)
                            }
                          >
                            {vehicle.is_featured ? "Unfeature" : "Feature"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <ActivityLogsTable logs={activityLogs} />
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <ReportedContentTable
              content={reportedContent}
              onHandle={handleReport}
            />
          </Card>
        </TabsContent>

        <TabsContent value="invites">
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Invite New User</h2>
            <InviteForm onInvite={sendInvite} />
          </div>
        </TabsContent>

        <TabsContent value="emails">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Email Templates</h2>
              <Button
                onClick={() => {
                  createEmailTemplate({
                    name: "New Template",
                    subject: "",
                    body: "",
                    variables: [],
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Template
              </Button>
            </div>
            {emailTemplates?.map((template) => (
              <Card key={template.id} className="p-6">
                <EmailTemplateEditor
                  template={template}
                  onSave={(updates) =>
                    updateEmailTemplate(template.id, updates)
                  }
                />
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          {systemSettings && (
            <SystemSettingsForm
              settings={systemSettings}
              onSave={updateSettings}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
