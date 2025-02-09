import { supabase } from "../supabase";
import { Review } from "@/types/database";

export const reviewsApi = {
  async list(sellerId: string) {
    const { data, error } = await supabase
      .from("reviews")
      .select("*, reviewer:profiles(*)")
      .eq("seller_id", sellerId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(review: Omit<Review, "id" | "created_at" | "reviewer">) {
    const { data, error } = await supabase
      .from("reviews")
      .insert(review)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Pick<Review, "rating" | "comment">) {
    const { data, error } = await supabase
      .from("reviews")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) throw error;
  },
};
