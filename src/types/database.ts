export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  role: "user" | "dealer" | "admin";
  is_verified: boolean;
  phone?: string;
  business_license?: string;
  created_at: string;
  updated_at: string;
  last_seen?: string;
}

export interface Vehicle {
  id: string;
  seller_id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  fuel_type?: string;
  transmission?: string;
  description?: string;
  images?: string[];
  status: "pending" | "active" | "inactive";
  is_featured: boolean;
  location?: string;
  latitude?: number;
  longitude?: number;
  vin?: string;
  created_at: string;
  seller?: Profile;
}

export interface Review {
  id: string;
  reviewer_id: string;
  seller_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  reviewer?: Profile;
}

export interface Favorite {
  id: string;
  user_id: string;
  vehicle_id: string;
  created_at: string;
  vehicle?: Vehicle;
}

export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  filters: Record<string, any>;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  user?: Profile;
}

export interface ReportedContent {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  content_type: string;
  content_id: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  admin_notes?: string;
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
  reporter?: Profile;
  reported_user?: Profile;
}

export interface SellerProfile extends Profile {
  business_name?: string;
  business_description?: string;
  business_address?: string;
  business_phone?: string;
  business_email?: string;
  business_hours?: Record<string, any>;
  social_media?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface SellerAnalytics {
  id: string;
  seller_id: string;
  date: string;
  views: number;
  inquiries: number;
  favorites: number;
  revenue: number;
}

export interface SellerDocument {
  id: string;
  seller_id: string;
  type: string;
  file_url: string;
  status: "pending" | "approved" | "rejected";
  admin_notes?: string;
  created_at: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  created_at: string;
  updated_at: string;
}

export interface SystemSettings {
  site_name: string;
  maintenance_mode: boolean;
  allowed_file_types: string[];
  max_file_size: number;
  featured_listing_price: number;
  commission_rate: number;
  default_currency: string;
  smtp_settings?: {
    host: string;
    port: number;
    user: string;
    password: string;
    from_email: string;
    from_name: string;
  };
}
