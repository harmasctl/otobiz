import { supabase } from "../supabase";
import {
  SellerProfile,
  SellerAnalytics,
  SellerDocument,
} from "@/types/database";

export const sellersApi = {
  async getProfile(id: string) {
    const { data, error } = await supabase
      .from("seller_profiles")
      .select("*, profile:profiles(*)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async updateProfile(id: string, updates: Partial<SellerProfile>) {
    const { data, error } = await supabase
      .from("seller_profiles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getAnalytics(id: string, period: "day" | "week" | "month" | "year") {
    const { data, error } = await supabase
      .from("seller_analytics")
      .select("*")
      .eq("seller_id", id)
      .gte(
        "date",
        new Date(
          Date.now() -
            86400000 *
              (period === "day"
                ? 1
                : period === "week"
                  ? 7
                  : period === "month"
                    ? 30
                    : 365),
        ).toISOString(),
      )
      .order("date", { ascending: true });
    if (error) throw error;
    return data;
  },

  async uploadDocument(id: string, type: string, file: File) {
    const fileExt = file.name.split(".").pop();
    const filePath = `${id}/${type}/${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("seller_documents")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("seller_documents").getPublicUrl(filePath);

    const { data, error } = await supabase
      .from("seller_documents")
      .insert({
        seller_id: id,
        type,
        file_url: publicUrl,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getDocuments(id: string) {
    const { data, error } = await supabase
      .from("seller_documents")
      .select("*")
      .eq("seller_id", id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getSubscription(id: string) {
    const { data, error } = await supabase
      .from("seller_subscriptions")
      .select("*")
      .eq("seller_id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async getPayouts(id: string) {
    const { data, error } = await supabase
      .from("seller_payouts")
      .select("*")
      .eq("seller_id", id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async requestPayout(
    id: string,
    amount: number,
    method: string,
    details: any,
  ) {
    const { data, error } = await supabase
      .from("seller_payouts")
      .insert({
        seller_id: id,
        amount,
        status: "pending",
        payout_method: method,
        payout_details: details,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
