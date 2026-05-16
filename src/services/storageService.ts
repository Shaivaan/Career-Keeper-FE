import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../Supabase/supabase';

/**
 * Uploads a file to a Supabase Storage bucket and returns its public URL.
 * `pathPrefix` is optional (used e.g. to namespace profile pictures per user),
 * mirroring the folder structure used previously with Firebase Storage.
 */
export const uploadFile = async (
  bucket: string,
  file: File,
  pathPrefix = '',
): Promise<string> => {
  const safeName = `${file.name}_${uuidv4()}`;
  const filePath = pathPrefix ? `${pathPrefix}/${safeName}` : safeName;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file);
  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};

/**
 * Deletes a file from a bucket given its public URL.
 * Supabase needs the object path (relative to the bucket), so we extract it
 * from the public URL: .../object/public/<bucket>/<path>
 */
export const deleteFileByUrl = async (bucket: string, publicUrl: string): Promise<void> => {
  if (!publicUrl) return;
  const marker = `/object/public/${bucket}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return;

  const objectPath = decodeURIComponent(publicUrl.substring(idx + marker.length));
  const { error } = await supabase.storage.from(bucket).remove([objectPath]);
  if (error) throw error;
};
