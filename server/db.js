const conn = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = conn.createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;