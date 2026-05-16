import { supabase } from '../Supabase/supabase';

/**
 * Supabase doesn't expose Firebase-style error codes (e.g. 'auth/invalid-credential').
 * To keep the existing UI error handling working unchanged, we normalise Supabase
 * errors back into objects shaped like { code: string } that the screens already expect.
 */
const toFirebaseStyleError = (message: string): { code: string; message: string } => {
  const msg = (message || '').toLowerCase();
  if (msg.includes('already registered') || msg.includes('already been registered') || msg.includes('user already exists')) {
    return { code: 'auth/email-already-in-use', message };
  }
  if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
    return { code: 'auth/invalid-credential', message };
  }
  if (msg.includes('email not confirmed')) {
    return { code: 'auth/invalid-credential', message };
  }
  if (msg.includes('invalid email') || msg.includes('unable to validate email')) {
    return { code: 'auth/invalid-email', message };
  }
  return { code: 'auth/unknown', message };
};

const handleSubmitUserRegister = async (
  values: SignUpFormValuesType,
  handleError: (error: unknown) => void,
  handleSuccess: VoidReturnType,
  handleFinally: VoidReturnType,
) => {
  const { email, password, first_name, last_name } = values;
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // first_name / last_name are read by the DB trigger that creates the profile row
        data: { first_name, last_name },
      },
    });
    if (error) throw error;
    handleSuccess();
  } catch (error: unknown) {
    handleError(toFirebaseStyleError((error as { message?: string })?.message ?? ''));
  } finally {
    handleFinally();
  }
};

const handleSignInUser = async (
  values: LoginValueType,
  handleSuccess: VoidReturnType,
  handleError: (error: unknown) => void,
  handleFinally: VoidReturnType,
) => {
  const { email, password } = values;
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    handleSuccess();
  } catch (error) {
    handleError(toFirebaseStyleError((error as { message?: string })?.message ?? ''));
  } finally {
    handleFinally();
  }
};

const handleforgotPassword = async (
  values: ForgotPWValueType,
  handleSuccess: VoidReturnType,
  handleError: (error: unknown) => void,
  handleFinally: VoidReturnType,
) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email);
    if (error) throw error;
    handleSuccess();
  } catch (error) {
    handleError(toFirebaseStyleError((error as { message?: string })?.message ?? ''));
  } finally {
    handleFinally();
  }
};

const handleLogout = async (handleSuccess: VoidFunction, handleError: VoidFunction) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    handleSuccess();
  } catch (error) {
    handleError();
  }
};

export { handleforgotPassword, handleSubmitUserRegister, handleSignInUser, handleLogout };
