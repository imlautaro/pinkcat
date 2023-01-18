export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          created_at: string | null
          id: number
          image: string | null
          name: string
          parent_id: number | null
          price: number | null
          sku: string | null
          visible: boolean
        }
        Insert: {
          created_at?: string | null
          id?: number
          image?: string | null
          name: string
          parent_id?: number | null
          price?: number | null
          sku?: string | null
          visible?: boolean
        }
        Update: {
          created_at?: string | null
          id?: number
          image?: string | null
          name?: string
          parent_id?: number | null
          price?: number | null
          sku?: string | null
          visible?: boolean
        }
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
  }
}
