import { createClient } from "@supabase/supabase-js";

const apiUrl = "https://rvlzmzybmuskdoshrppk.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bHptenlibXVza2Rvc2hycHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMjQzMTksImV4cCI6MjA1MzcwMDMxOX0.KfWmaoDQNVU4qMQt7Z3ELhGRT84ApMxMPxqd9RJZsXg"

export const supabase = createClient(apiUrl,apiKey);
