import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  let { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}
export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updatedObject = {};
  if (password) updatedObject = { password };
  if (fullName) updatedObject = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updatedObject);
  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);
  const { data: updatedData, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  return updatedData;
}
