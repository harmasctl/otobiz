import { supabase } from "../supabase";
import { Vehicle } from "@/types/database";

export const vehiclesApi = {
  async list(filters?: Record<string, any>) {
    let query = supabase.from("vehicles").select("*, seller:profiles(*)");

    if (filters?.make) query = query.eq("make", filters.make);
    if (filters?.model) query = query.eq("model", filters.model);
    if (filters?.minPrice) query = query.gte("price", filters.minPrice);
    if (filters?.maxPrice) query = query.lte("price", filters.maxPrice);
    if (filters?.minYear) query = query.gte("year", filters.minYear);
    if (filters?.maxYear) query = query.lte("year", filters.maxYear);
    if (filters?.transmission)
      query = query.eq("transmission", filters.transmission);
    if (filters?.fuelType) query = query.eq("fuel_type", filters.fuelType);
    if (filters?.location)
      query = query.ilike("location", `%${filters.location}%`);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*, seller:profiles(*)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(vehicle: Omit<Vehicle, "id" | "created_at">) {
    const { data, error } = await supabase
      .from("vehicles")
      .insert(vehicle)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Vehicle>) {
    const { data, error } = await supabase
      .from("vehicles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from("vehicles").delete().eq("id", id);
    if (error) throw error;
  },

  async uploadImages(id: string, files: File[]) {
    const uploadPromises = files.map(async (file) => {
      const fileExt = file.name.split(".").pop();
      const filePath = `${id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("vehicles")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("vehicles").getPublicUrl(filePath);

      return publicUrl;
    });

    const urls = await Promise.all(uploadPromises);

    const { data, error } = await supabase
      .from("vehicles")
      .update({ images: urls })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
