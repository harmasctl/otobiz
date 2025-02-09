import { supabase } from "../supabase";
import { SavedSearch } from "@/types/database";

export const savedSearchesApi = {
  async list() {
    const { data, error } = await supabase
      .from("saved_searches")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(search: Omit<SavedSearch, "id" | "created_at" | "user_id">) {
    const { data, error } = await supabase
      .from("saved_searches")
      .insert(search)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from("saved_searches")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },
};
