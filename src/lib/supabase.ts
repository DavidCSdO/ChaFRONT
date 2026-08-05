import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hrbbadmjkrvkuctzdnqi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyYmJhZG1qa3J2a3VjdHpkbnFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NTgxNjUsImV4cCI6MjA5NjAzNDE2NX0.2-svdDf-SBjpE_D__26DF0wDmwnzQV0OyLMTDdfWlMI";

// Supabase client singleton to prevent multiple GoTrueClient warnings
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
