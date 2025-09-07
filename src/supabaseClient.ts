import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase"; // 타입을 제네릭으로 전달

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// 제네릭으로 Database 타입을 지정하면 자동완성, 타입 체크 가능
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
