import { supabase } from '../Supabase/supabase';

/**
 * The frontend works with a nested `showCase` object, while the `profiles`
 * table stores those values as flat `showcase_*` columns. These two helpers
 * translate between the DB row shape and the shape the components expect,
 * so no UI/form code needs to change.
 */

type ProfileRow = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  about: string | null;
  profile_picture: string | null;
  profession: unknown;
  showcase_linked_in: string | null;
  showcase_github: string | null;
  showcase_resume: string | null;
  showcase_instagram: string | null;
  showcase_youtube: string | null;
  showcase_cover_letter: string | null;
};

const rowToProfile = (row: ProfileRow): ProfileDataStateType => ({
  first_name: row.first_name,
  last_name: row.last_name,
  email: row.email,
  about: row.about,
  profile_picture: row.profile_picture,
  profession: (row.profession as string[]) ?? [],
  showCase: {
    linked_in: row.showcase_linked_in,
    github: row.showcase_github,
    resume: row.showcase_resume,
    instagram: row.showcase_instagram,
    youtube: row.showcase_youtube,
    cover_letter: row.showcase_cover_letter,
  },
});

/** Converts a partial FE update (profile fields and/or showCase) into flat DB columns. */
const profileUpdateToRow = (
  updates: Partial<EditProfileFormIntiValueType> | { showCase: ShowCaseFormType },
): Record<string, unknown> => {
  const row: Record<string, unknown> = {};
  const u = updates as Record<string, unknown>;

  if ('first_name' in u) row.first_name = u.first_name;
  if ('last_name' in u) row.last_name = u.last_name;
  if ('email' in u) row.email = u.email;
  if ('about' in u) row.about = u.about;
  if ('profile_picture' in u) row.profile_picture = u.profile_picture;
  if ('profession' in u) row.profession = u.profession;

  if ('showCase' in u && u.showCase) {
    const sc = u.showCase as ShowCaseFormType;
    row.showcase_linked_in = sc.linked_in;
    row.showcase_github = sc.github;
    row.showcase_resume = sc.resume;
    row.showcase_instagram = sc.instagram;
    row.showcase_youtube = sc.youtube;
    row.showcase_cover_letter = sc.cover_letter;
  }
  return row;
};

/** Fetches the current user's profile. Returns null if no row exists. */
export const fetchProfile = async (userId: string): Promise<ProfileDataStateType | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return rowToProfile(data as ProfileRow);
};

/** Updates the current user's profile (personal fields or showCase). */
export const updateProfile = async (
  userId: string,
  updates: Partial<EditProfileFormIntiValueType> | { showCase: ShowCaseFormType },
): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .update(profileUpdateToRow(updates))
    .eq('id', userId);
  if (error) throw error;
};
