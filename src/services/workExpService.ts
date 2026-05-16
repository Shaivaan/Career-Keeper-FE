import { supabase } from '../Supabase/supabase';

type WorkExpRecord = WorkExpFormType & { id?: string; user_id?: string };

/**
 * The form supplies `joining_date` / `end_date` as JS Date objects (or null),
 * but the `work_experiences` table stores them as Postgres `date` columns.
 * We send ISO date strings (YYYY-MM-DD) on write.
 */
const toDateString = (value: WorkExpFormType['joining_date']): string | null => {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().split('T')[0];
};

/** Maps a form value to a DB row (drops the client-only `id`, normalises dates). */
const toRow = (values: WorkExpRecord, userId: string): Record<string, unknown> => {
  const { id: _id, joining_date, end_date, ...rest } = values;
  return {
    ...rest,
    user_id: userId,
    joining_date: toDateString(joining_date),
    end_date: values.is_currently_working ? null : toDateString(end_date),
  };
};

/** Fetches all work-experience records for a user. */
export const fetchWorkExpByUserId = async (
  userId: string,
): Promise<WorkExpFormType[]> => {
  const { data, error } = await supabase
    .from('work_experiences')
    .select('*')
    .eq('user_id', userId)
    .order('joining_date', { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as WorkExpFormType[];
};

/** Inserts a new work-experience record. */
export const addWorkExp = async (
  values: WorkExpFormType,
  userId: string,
): Promise<void> => {
  const { error } = await supabase
    .from('work_experiences')
    .insert(toRow(values, userId));
  if (error) throw error;
};

/** Updates an existing work-experience record (identified by id). */
export const updateWorkExp = async (
  values: WorkExpRecord,
  userId: string,
): Promise<void> => {
  const { error } = await supabase
    .from('work_experiences')
    .update(toRow(values, userId))
    .eq('id', values.id as string);
  if (error) throw error;
};

/** Fetches a single record by id (used to read its logo URL before deletion). */
export const getWorkExpById = async (
  workExpId: string,
): Promise<WorkExpFormType | null> => {
  const { data, error } = await supabase
    .from('work_experiences')
    .select('*')
    .eq('id', workExpId)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as WorkExpFormType) ?? null;
};

/** Deletes a work-experience record by id. */
export const deleteWorkExp = async (workExpId: string): Promise<void> => {
  const { error } = await supabase.from('work_experiences').delete().eq('id', workExpId);
  if (error) throw error;
};
