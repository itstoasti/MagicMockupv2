export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      ai_messages: {
        Row: {
          content: string | null
          conversation_id: string
          id: string
          role: string
          timestamp: string
          user_id: string
        }
        Insert: {
          content?: string | null
          conversation_id: string
          id?: string
          role: string
          timestamp?: string
          user_id: string
        }
        Update: {
          content?: string | null
          conversation_id?: string
          id?: string
          role?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_foods: {
        Row: {
          created_at: string
          food_data: Json
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          food_data: Json
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          food_data?: Json
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      foods: {
        Row: {
          barcode: string | null
          brand: string | null
          calories: number | null
          carbs: number | null
          created_at: string
          fat: number | null
          id: string
          is_keto_friendly: boolean | null
          meal_id: string
          name: string
          protein: number | null
          serving_size: string | null
          user_id: string
        }
        Insert: {
          barcode?: string | null
          brand?: string | null
          calories?: number | null
          carbs?: number | null
          created_at?: string
          fat?: number | null
          id?: string
          is_keto_friendly?: boolean | null
          meal_id: string
          name: string
          protein?: number | null
          serving_size?: string | null
          user_id: string
        }
        Update: {
          barcode?: string | null
          brand?: string | null
          calories?: number | null
          carbs?: number | null
          created_at?: string
          fat?: number | null
          id?: string
          is_keto_friendly?: boolean | null
          meal_id?: string
          name?: string
          protein?: number | null
          serving_size?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "foods_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          created_at: string
          date: string | null
          foods: Json | null
          id: string
          macros: Json | null
          meal_date: string
          meal_time: string | null
          meal_type: string
          name: string | null
          time: string | null
          total_calories: number | null
          total_carbs: number | null
          total_fat: number | null
          total_protein: number | null
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          foods?: Json | null
          id?: string
          macros?: Json | null
          meal_date?: string
          meal_time?: string | null
          meal_type: string
          name?: string | null
          time?: string | null
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_protein?: number | null
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string | null
          foods?: Json | null
          id?: string
          macros?: Json | null
          meal_date?: string
          meal_time?: string | null
          meal_type?: string
          name?: string | null
          time?: string | null
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_protein?: number | null
          type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      shared_barcode_data: {
        Row: {
          barcode: string
          calories: number | null
          carbs: number | null
          created_at: string
          fat: number | null
          name: string
          protein: number | null
          serving_size: string | null
          submitted_by_user_id: string | null
        }
        Insert: {
          barcode: string
          calories?: number | null
          carbs?: number | null
          created_at?: string
          fat?: number | null
          name: string
          protein?: number | null
          serving_size?: string | null
          submitted_by_user_id?: string | null
        }
        Update: {
          barcode?: string
          calories?: number | null
          carbs?: number | null
          created_at?: string
          fat?: number | null
          name?: string
          protein?: number | null
          serving_size?: string | null
          submitted_by_user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          activity_level: string | null
          daily_calorie_limit: number | null
          daily_calories_limit: number | null
          daily_carbs_limit: number | null
          daily_fat_limit: number | null
          daily_macro_limit: Json | null
          daily_protein_limit: number | null
          goal: string | null
          height: number | null
          height_unit: string | null
          name: string | null
          updated_at: string
          user_id: string
          weight: number | null
          weight_unit: string | null
        }
        Insert: {
          activity_level?: string | null
          daily_calorie_limit?: number | null
          daily_calories_limit?: number | null
          daily_carbs_limit?: number | null
          daily_fat_limit?: number | null
          daily_macro_limit?: Json | null
          daily_protein_limit?: number | null
          goal?: string | null
          height?: number | null
          height_unit?: string | null
          name?: string | null
          updated_at?: string
          user_id: string
          weight?: number | null
          weight_unit?: string | null
        }
        Update: {
          activity_level?: string | null
          daily_calorie_limit?: number | null
          daily_calories_limit?: number | null
          daily_carbs_limit?: number | null
          daily_fat_limit?: number | null
          daily_macro_limit?: Json | null
          daily_protein_limit?: number | null
          goal?: string | null
          height?: number | null
          height_unit?: string | null
          name?: string | null
          updated_at?: string
          user_id?: string
          weight?: number | null
          weight_unit?: string | null
        }
        Relationships: []
      }
      weight_history: {
        Row: {
          created_at: string
          entry_date: string
          id: string
          user_id: string
          weight_kg: number
        }
        Insert: {
          created_at?: string
          entry_date?: string
          id?: string
          user_id: string
          weight_kg: number
        }
        Update: {
          created_at?: string
          entry_date?: string
          id?: string
          user_id?: string
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "weight_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
