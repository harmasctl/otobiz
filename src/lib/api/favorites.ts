import { supabase } from "../supabase";

export const favoritesApi = {
  async list() {
    const { data, error } = await supabase
      .from("favorites")
      .select("*, vehicle:vehicles(*)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async add(vehicleId: string) {
    const { data, error } = await supabase
      .from("favorites")
      .insert({ vehicle_id: vehicleId })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(vehicleId: string) {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("vehicle_id", vehicleId);
    if (error) throw error;
  },
};
