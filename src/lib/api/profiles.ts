import { supabase } from "../supabase";
import { Profile } from "@/types/database";

export const profilesApi = {
  async get(id: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateAvatar(id: string, file: File) {
    const fileExt = file.name.split(".").pop();
    const filePath = `${id}/${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const { data, error } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
