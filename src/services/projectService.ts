import { supabase } from '../Supabase/supabase';

type ProjectRecord = AddProjectInitialValueType & { id?: string; user_id?: string };

/** Fetches all projects belonging to a user, ordered by their saved priority. */
export const fetchProjectsByUserId = async (
  userId: string,
): Promise<AddProjectInitialValueType[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('project_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as AddProjectInitialValueType[];
};

/** Inserts a new project for the given user. */
export const addProject = async (
  values: AddProjectInitialValueType,
  userId: string,
): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .insert({ ...values, user_id: userId });
  if (error) throw error;
};

/** Updates an existing project (identified by its id). */
export const updateProject = async (
  values: ProjectRecord,
  userId: string,
): Promise<void> => {
  const { id, ...rest } = values;
  const { error } = await supabase
    .from('projects')
    .update({ ...rest, user_id: userId })
    .eq('id', id as string);
  if (error) throw error;
};

/** Fetches a single project by id (used to read its image URL before deletion). */
export const getProjectById = async (
  projectId: string,
): Promise<AddProjectInitialValueType | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as AddProjectInitialValueType) ?? null;
};

/** Deletes a project by id. */
export const deleteProject = async (projectId: string): Promise<void> => {
  const { error } = await supabase.from('projects').delete().eq('id', projectId);
  if (error) throw error;
};
