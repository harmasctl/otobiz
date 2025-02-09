import { useState, useEffect } from "react";
import { adminApi } from "@/lib/api/admin";
import { Profile, Vehicle } from "@/types/database";

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalDealers: number;
  verifiedDealers: number;
  totalVehicles: number;
  activeListings: number;
  pendingListings: number;
  featuredListings: number;
  totalFavorites: number;
  totalReviews: number;
  averageRating: number;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details: Record<string, any>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  user?: Profile;
}

export interface ReportedContent {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  content_type: string;
  content_id: string;
  reason: string;
  status: string;
  admin_notes?: string;
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
  reporter?: Profile;
  reported_user?: Profile;
}

export interface SystemSettings {
  site_name: string;
  maintenance_mode: boolean;
  allowed_file_types: string[];
  max_file_size: number;
  featured_listing_price: number;
  commission_rate: number;
  default_currency: string;
  smtp_settings?: Record<string, any>;
}

export interface Invitation {
  id: string;
  email: string;
  role: string;
  invited_by: string;
  token: string;
  expires_at: string;
  used_at?: string;
  created_at: string;
}

export function useAdmin() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [reportedContent, setReportedContent] = useState<ReportedContent[]>([]);
  const [systemSettings, setSystemSettings] = useState<SystemSettings | null>(
    null,
  );
  const [analyticsData, setAnalyticsData] = useState<Record<
    string,
    any
  > | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [emailTemplates, setEmailTemplates] = useState<any[]>([]);

  const fetchStats = async () => {
    try {
      const data = await adminApi.getStats();
      setStats(data);
    } catch (err) {
      setError(err as Error);
    }
  };

  const fetchUsers = async (filters?: {
    role?: string;
    verified?: boolean;
  }) => {
    try {
      const data = await adminApi.listUsers(filters);
      setUsers(data);
    } catch (err) {
      setError(err as Error);
    }
  };

  const fetchVehicles = async (filters?: {
    status?: string;
    featured?: boolean;
  }) => {
    try {
      const data = await adminApi.listVehicles(filters);
      setVehicles(data);
    } catch (err) {
      setError(err as Error);
    }
  };

  const updateUserRole = async (
    userId: string,
    role: "user" | "dealer" | "admin",
  ) => {
    try {
      await adminApi.updateUserRole(userId, role);
      await fetchUsers();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const verifyUser = async (userId: string, verified: boolean) => {
    try {
      await adminApi.verifyUser(userId, verified);
      await fetchUsers();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateVehicleStatus = async (vehicleId: string, status: string) => {
    try {
      await adminApi.updateVehicleStatus(vehicleId, status);
      await fetchVehicles();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const toggleFeatured = async (vehicleId: string, featured: boolean) => {
    try {
      await adminApi.toggleFeatured(vehicleId, featured);
      await fetchVehicles();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [settings, templates] = await Promise.all([
          adminApi.getSystemSettings(),
          adminApi.getEmailTemplates(),
          fetchStats(),
          fetchUsers(),
          fetchVehicles(),
        ]);
        setSystemSettings(settings);
        setEmailTemplates(templates || []);
      } catch (err) {
        console.error("Error loading admin data:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const fetchActivityLogs = async (filters?: {
    userId?: string;
    action?: string;
    from?: string;
    to?: string;
  }) => {
    try {
      const data = await adminApi.getActivityLogs(filters);
      setActivityLogs(data);
    } catch (err) {
      setError(err as Error);
    }
  };

  const fetchReportedContent = async () => {
    try {
      const data = await adminApi.getReportedContent();
      setReportedContent(data);
    } catch (err) {
      setError(err as Error);
    }
  };

  const handleReport = async (
    reportId: string,
    action: "approve" | "reject",
    notes?: string,
  ) => {
    try {
      await adminApi.handleReport(reportId, action, notes);
      await fetchReportedContent();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const fetchSystemSettings = async () => {
    try {
      const data = await adminApi.getSystemSettings();
      setSystemSettings(data);
    } catch (err) {
      setError(err as Error);
    }
  };

  const updateSettings = async (settings: Partial<SystemSettings>) => {
    try {
      const updated = await adminApi.updateSystemSettings(settings);
      setSystemSettings(updated);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const fetchAnalytics = async (period: "day" | "week" | "month" | "year") => {
    try {
      const [revenue, users, listings] = await Promise.all([
        adminApi.getRevenueStats(period),
        adminApi.getUserStats(period),
        adminApi.getListingStats(period),
      ]);
      setAnalyticsData({ revenue, users, listings });
    } catch (err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [templates] = await Promise.all([
          adminApi.getEmailTemplates(),
          fetchStats(),
          fetchUsers(),
          fetchVehicles(),
          fetchActivityLogs(),
          fetchReportedContent(),
          fetchSystemSettings(),
        ]);
        setEmailTemplates(templates);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const sendInvite = async (email: string, role: string) => {
    try {
      await adminApi.sendInvite(email, role);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const createEmailTemplate = async (template: any) => {
    try {
      const created = await adminApi.createEmailTemplate(template);
      setEmailTemplates((prev) => [...prev, created]);
      return created;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateEmailTemplate = async (id: string, updates: any) => {
    try {
      const updated = await adminApi.updateEmailTemplate(id, updates);
      setEmailTemplates((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t)),
      );
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteEmailTemplate = async (id: string) => {
    try {
      await adminApi.deleteEmailTemplate(id);
      setEmailTemplates((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    stats,
    users,
    vehicles,
    loading,
    error,
    fetchStats,
    fetchUsers,
    fetchVehicles,
    updateUserRole,
    verifyUser,
    updateVehicleStatus,
    toggleFeatured,
    activityLogs,
    fetchActivityLogs,
    reportedContent,
    fetchReportedContent,
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
  };
}
