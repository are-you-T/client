import { Database } from "@/types/supabase";

export type MemoType = Database["public"]["Tables"]["Memo"]["Row"];
export type CommentType = Database["public"]["Tables"]["Comment"]["Row"];
