export type ServiceCategory = "dental" | "estetica";
export type LeadStatus = "nuevo" | "contactado" | "agendado" | "cancelado";

// NOTA: se usan `type` (no `interface`) porque TypeScript solo reconoce los
// alias de objeto literal como compatibles con `Record<string, unknown>`,
// que es lo que exige la forma `GenericTable` del SDK de Supabase para que
// el tipado de `.from(...).select()/.insert()/.update()` funcione (si no,
// todo colapsa silenciosamente a `never`).
export type Profile = {
  id: string;
  full_name: string;
  role: "admin";
  active: boolean;
  created_at: string;
};

export type SiteSettings = {
  id: number;
  clinic_name: string;
  tagline: string;
  hero_subtitle: string;
  hero_image_url: string | null;
  about_title: string;
  about_text: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
  schedule_text: string;
  instagram_url: string | null;
  facebook_url: string | null;
  map_embed_url: string | null;
  primary_color: string;
  updated_at: string;
};

export type Service = {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  price: number | null;
  duration_minutes: number | null;
  image_url: string | null;
  active: boolean;
  sort_order: number;
  created_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role_title: string;
  bio: string;
  photo_url: string | null;
  active: boolean;
  sort_order: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  author_name: string;
  content: string;
  rating: number;
  active: boolean;
  sort_order: number;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  image_url: string;
  caption: string;
  sort_order: number;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  sku: string | null;
  category: string;
  price: number | null;
  stock: number;
  low_stock_threshold: number;
  image_url: string | null;
  active: boolean;
  sort_order: number;
  created_at: string;
};

export type AppointmentRequest = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service_id: string | null;
  preferred_date: string | null;
  message: string;
  status: LeadStatus;
  created_at: string;
};

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12";
  };
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      site_settings: {
        Row: SiteSettings;
        Insert: Partial<SiteSettings>;
        Update: Partial<SiteSettings>;
        Relationships: [];
      };
      services: {
        Row: Service;
        Insert: Partial<Service> & { category: ServiceCategory; name: string };
        Update: Partial<Service>;
        Relationships: [];
      };
      team_members: {
        Row: TeamMember;
        Insert: Partial<TeamMember> & { name: string };
        Update: Partial<TeamMember>;
        Relationships: [];
      };
      testimonials: {
        Row: Testimonial;
        Insert: Partial<Testimonial> & { author_name: string; content: string };
        Update: Partial<Testimonial>;
        Relationships: [];
      };
      gallery_images: {
        Row: GalleryImage;
        Insert: Partial<GalleryImage> & { image_url: string };
        Update: Partial<GalleryImage>;
        Relationships: [];
      };
      products: {
        Row: Product;
        Insert: Partial<Product> & { name: string };
        Update: Partial<Product>;
        Relationships: [];
      };
      appointment_requests: {
        Row: AppointmentRequest;
        Insert: Partial<AppointmentRequest> & { name: string; phone: string };
        Update: Partial<AppointmentRequest>;
        Relationships: [
          {
            foreignKeyName: "appointment_requests_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      service_category: ServiceCategory;
      lead_status: LeadStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
