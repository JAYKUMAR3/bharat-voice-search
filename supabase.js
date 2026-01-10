console.log("Supabase file loaded");

const SUPABASE_URL = "https://cvijgebyijjakaoltoay.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_zM3pHQ96cQvKVqpQjFOZ9A_-sqkSMJW";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

console.log("Supabase connected");