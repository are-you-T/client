export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      Answer: {
        Row: {
          awareness:
            | Database["public"]["Enums"]["MBTIElementOption_Awareness"]
            | null
          content: string
          created_at: string
          dimension: Database["public"]["Enums"]["MBTIType"]
          energy: Database["public"]["Enums"]["MBTIElementOption_Energy"] | null
          id: string
          judgement:
            | Database["public"]["Enums"]["MBTIElementOption_Judgement"]
            | null
          life: Database["public"]["Enums"]["MBTIElementOption_Life"] | null
          proportion: number
          questionId: string
          updated_at: string
        }
        Insert: {
          awareness?:
            | Database["public"]["Enums"]["MBTIElementOption_Awareness"]
            | null
          content: string
          created_at?: string
          dimension: Database["public"]["Enums"]["MBTIType"]
          energy?:
            | Database["public"]["Enums"]["MBTIElementOption_Energy"]
            | null
          id?: string
          judgement?:
            | Database["public"]["Enums"]["MBTIElementOption_Judgement"]
            | null
          life?: Database["public"]["Enums"]["MBTIElementOption_Life"] | null
          proportion: number
          questionId?: string
          updated_at?: string
        }
        Update: {
          awareness?:
            | Database["public"]["Enums"]["MBTIElementOption_Awareness"]
            | null
          content?: string
          created_at?: string
          dimension?: Database["public"]["Enums"]["MBTIType"]
          energy?:
            | Database["public"]["Enums"]["MBTIElementOption_Energy"]
            | null
          id?: string
          judgement?:
            | Database["public"]["Enums"]["MBTIElementOption_Judgement"]
            | null
          life?: Database["public"]["Enums"]["MBTIElementOption_Life"] | null
          proportion?: number
          questionId?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Answer_questionId_fkey"
            columns: ["questionId"]
            isOneToOne: false
            referencedRelation: "Question"
            referencedColumns: ["id"]
          },
        ]
      }
      Comment: {
        Row: {
          content: string
          created_at: string
          deleteYn: boolean | null
          id: string
          likeCount: number | null
          memoId: string
          nickname: string
          parentCommentId: string | null
          password: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string
          deleteYn?: boolean | null
          id?: string
          likeCount?: number | null
          memoId: string
          nickname: string
          parentCommentId?: string | null
          password: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          deleteYn?: boolean | null
          id?: string
          likeCount?: number | null
          memoId?: string
          nickname?: string
          parentCommentId?: string | null
          password?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Comment_memoId_fkey"
            columns: ["memoId"]
            isOneToOne: false
            referencedRelation: "Memo"
            referencedColumns: ["id"]
          },
        ]
      }
      Mbti: {
        Row: {
          content: string
          count: number
          created_at: string
          deleteYn: boolean
          id: string
          mbtiType: Database["public"]["Enums"]["Mbti_Type"]
          summary: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          content: string
          count?: number
          created_at?: string
          deleteYn?: boolean
          id?: string
          mbtiType: Database["public"]["Enums"]["Mbti_Type"]
          summary: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          content?: string
          count?: number
          created_at?: string
          deleteYn?: boolean
          id?: string
          mbtiType?: Database["public"]["Enums"]["Mbti_Type"]
          summary?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      MbtiFit: {
        Row: {
          created_at: string
          deleteYn: boolean
          description: string
          fitType: Database["public"]["Enums"]["MBTI_Fit_Type"]
          id: string
          mbtiType: Database["public"]["Enums"]["Mbti_Type"]
          targetMbtiType: Database["public"]["Enums"]["Mbti_Type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleteYn?: boolean
          description: string
          fitType: Database["public"]["Enums"]["MBTI_Fit_Type"]
          id?: string
          mbtiType: Database["public"]["Enums"]["Mbti_Type"]
          targetMbtiType: Database["public"]["Enums"]["Mbti_Type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleteYn?: boolean
          description?: string
          fitType?: Database["public"]["Enums"]["MBTI_Fit_Type"]
          id?: string
          mbtiType?: Database["public"]["Enums"]["Mbti_Type"]
          targetMbtiType?: Database["public"]["Enums"]["Mbti_Type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_fit_mbti"
            columns: ["mbtiType"]
            isOneToOne: false
            referencedRelation: "Mbti"
            referencedColumns: ["mbtiType"]
          },
        ]
      }
      Memo: {
        Row: {
          cardColor: string
          cmtCount: number
          content: string
          created_at: string
          deleteYn: boolean
          id: string
          likeCount: number
          mbtiType: Database["public"]["Enums"]["Mbti_Type"]
          nickname: string
          password: string
          title: string
          updated_at: string
        }
        Insert: {
          cardColor: string
          cmtCount?: number
          content: string
          created_at?: string
          deleteYn?: boolean
          id?: string
          likeCount?: number
          mbtiType: Database["public"]["Enums"]["Mbti_Type"]
          nickname: string
          password: string
          title: string
          updated_at?: string
        }
        Update: {
          cardColor?: string
          cmtCount?: number
          content?: string
          created_at?: string
          deleteYn?: boolean
          id?: string
          likeCount?: number
          mbtiType?: Database["public"]["Enums"]["Mbti_Type"]
          nickname?: string
          password?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      Question: {
        Row: {
          created_at: string
          deleteYn: boolean
          id: string
          mbtiType: Database["public"]["Enums"]["MBTIType"]
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleteYn?: boolean
          id?: string
          mbtiType: Database["public"]["Enums"]["MBTIType"]
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleteYn?: boolean
          id?: string
          mbtiType?: Database["public"]["Enums"]["MBTIType"]
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_random_questions_by_type: {
        Args: {
          p_limit?: number
          p_type: Database["public"]["Enums"]["MBTIType"]
        }
        Returns: {
          created_at: string
          deleteYn: boolean
          id: string
          mbtiType: Database["public"]["Enums"]["MBTIType"]
          subject: string
          updated_at: string
        }[]
      }
      increment_comment_like: {
        Args: { p_comment: string }
        Returns: number
      }
      increment_memo_like: {
        Args: { p_memo: string }
        Returns: number
      }
    }
    Enums: {
      MBTI_Fit_Type: "good" | "bad"
      Mbti_Type:
        | "ESTJ"
        | "ISTJ"
        | "ESFJ"
        | "ISFJ"
        | "ISTP"
        | "ESTP"
        | "ISFP"
        | "ESFP"
        | "ENTJ"
        | "ENTP"
        | "INTJ"
        | "INTP"
        | "ENFJ"
        | "ENFP"
        | "INFJ"
        | "INFP"
      MBTIElementOption_Awareness: "S" | "N"
      MBTIElementOption_Energy: "E" | "I"
      MBTIElementOption_Judgement: "T" | "F"
      MBTIElementOption_Life: "J" | "P"
      MBTIType: "energy" | "awareness" | "judgement" | "life"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      MBTI_Fit_Type: ["good", "bad"],
      Mbti_Type: [
        "ESTJ",
        "ISTJ",
        "ESFJ",
        "ISFJ",
        "ISTP",
        "ESTP",
        "ISFP",
        "ESFP",
        "ENTJ",
        "ENTP",
        "INTJ",
        "INTP",
        "ENFJ",
        "ENFP",
        "INFJ",
        "INFP",
      ],
      MBTIElementOption_Awareness: ["S", "N"],
      MBTIElementOption_Energy: ["E", "I"],
      MBTIElementOption_Judgement: ["T", "F"],
      MBTIElementOption_Life: ["J", "P"],
      MBTIType: ["energy", "awareness", "judgement", "life"],
    },
  },
} as const
