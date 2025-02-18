import { supabase } from "../supabase";

export const adminApi = {
  async sendInvite(email: string) {
    try {
      const { data, error } = await supabase.rpc("send_invitation", {
        email,
      });

      if (error) {
        console.error("Error sending invitation:", error);
        throw error;
      }

      return data;
    } catch (err) {
      console.error("Error sending invitation:", err);
      throw err;
    }
  },

  async getStats() {
    const { data: stats, error } = await supabase.rpc("get_admin_stats");
    if (error) throw error;
    return stats;
  },

  async listUsers(filters?: { role?: string; verified?: boolean }) {
    let query = supabase.from("profiles").select("*");

    if (filters?.role) query = query.eq("role", filters.role);
    if (filters?.verified !== undefined)
      query = query.eq("is_verified", filters.verified);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async updateUserRole(userId: string, role: "user" | "dealer" | "admin") {
    const { data, error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async verifyUser(userId: string, verified: boolean) {
    const { data, error } = await supabase
      .from("profiles")
      .update({ is_verified: verified })
      .eq("id", userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async listVehicles(filters?: { status?: string; featured?: boolean }) {
    let query = supabase.from("vehicles").select("*, seller:profiles(*)");

    if (filters?.status) query = query.eq("status", filters.status);
    if (filters?.featured !== undefined)
      query = query.eq("is_featured", filters.featured);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async updateVehicleStatus(vehicleId: string, status: string) {
    const { data, error } = await supabase
      .from("vehicles")
      .update({ status })
      .eq("id", vehicleId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async toggleFeatured(vehicleId: string, featured: boolean) {
    const { data, error } = await supabase
      .from("vehicles")
      .update({ is_featured: featured })
      .eq("id", vehicleId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getAnalytics(period: "day" | "week" | "month" | "year") {
    const { data, error } = await supabase.rpc("get_analytics", { period });
    if (error) throw error;
    return data;
  },

  // Return default settings until system_settings table is set up
  async getSystemSettings() {
    return {
      site_name: "Otobiz",
      maintenance_mode: false,
      allowed_file_types: ["image/jpeg", "image/png", "image/webp"],
      max_file_size: 5242880,
      featured_listing_price: 49.99,
      commission_rate: 5.0,
      default_currency: "USD",
    };
  },

  async updateSystemSettings(settings: Record<string, any>) {
    // Temporarily do nothing until system_settings table is set up
    return settings;
  },

  async getActivityLogs(filters?: {
    userId?: string;
    action?: string;
    from?: string;
    to?: string;
  }) {
    let query = supabase
      .from("activity_logs")
      .select("*, user:profiles(*)")
      .order("created_at", { ascending: false });

    if (filters?.userId) query = query.eq("user_id", filters.userId);
    if (filters?.action) query = query.eq("action", filters.action);
    if (filters?.from) query = query.gte("created_at", filters.from);
    if (filters?.to) query = query.lte("created_at", filters.to);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getReportedContent() {
    const { data, error } = await supabase
      .from("reported_content")
      .select("*, reporter:profiles(*), reported_user:profiles(*)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async handleReport(
    reportId: string,
    action: "approve" | "reject",
    notes?: string,
  ) {
    const { data, error } = await supabase.rpc("handle_report", {
      report_id: reportId,
      action_taken: action,
      admin_notes: notes,
    });
    if (error) throw error;
    return data;
  },

  // Return empty array until email_templates table is set up
  async getEmailTemplates() {
    return [];
  },

  async createEmailTemplate(template: any) {
    // Temporarily do nothing until email_templates table is set up
    return template;
  },

  async updateEmailTemplate(id: string, updates: any) {
    // Temporarily do nothing until email_templates table is set up
    return { id, ...updates };
  },

  async deleteEmailTemplate(id: string) {
    // Temporarily do nothing until email_templates table is set up
  },
};
