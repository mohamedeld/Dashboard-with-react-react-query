import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ujaxuqqksvfnozimphbq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYXh1cXFrc3Zmbm96aW1waGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAzOTM4MTcsImV4cCI6MjAxNTk2OTgxN30.drMWvZ2O7GdZP1CcYZNDIlnJJQdDFrC0WhH4McAAM8E";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
