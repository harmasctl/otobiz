import { supabase } from "../supabase";

export const uploadImage = async (file: File, bucket: string, path: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return publicUrl;
};

export const deleteImage = async (bucket: string, path: string) => {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) throw error;
};

export const getImageUrl = (bucket: string, path: string) => {
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
};
