export interface Course {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  thumbnail?: string;
  instructor: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  price: number;
  sale_price?: number | null;
  duration_hours: number;
  lessons_count: number;
  students_count: number;
  rating: number;
  technologies: string[];
  curriculum?: { title: string; lessons: number }[];
  faq?: { question: string; answer: string }[];
  is_featured: boolean;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  type: string;
  description?: string;
  icon?: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  icon?: string;
  thumbnail?: string;
  technologies: string[];
  workflow?: { step: string; description: string }[];
  is_featured: boolean;
}

export interface PortfolioProject {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  thumbnail?: string;
  gallery?: string[];
  technologies: string[];
  client?: string;
  result?: string;
  is_featured: boolean;
  category?: Category;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  thumbnail?: string;
  gallery?: string[];
  specifications?: Record<string, string>;
  downloads?: { name: string; url: string }[];
  price: number;
  buy_url?: string;
  is_featured: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  thumbnail?: string;
  tags: string[];
  read_time: number;
  views: number;
  published_at: string;
  is_featured: boolean;
  category?: Category;
  author?: { name: string; avatar?: string };
}

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating: number;
}

export interface TeamMember {
  id: number;
  name: string;
  slug: string;
  role: string;
  bio?: string;
  avatar?: string;
  social_links?: Record<string, string>;
}

export interface Event {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  description?: string;
  thumbnail?: string;
  location?: string;
  starts_at: string;
  price: number;
  is_featured: boolean;
}

export interface CareerPosition {
  id: number;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  type: string;
  description?: string;
  requirements?: string[];
}

export interface GalleryItem {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  image: string;
  type?: string;
  category?: string;
  sort_order?: number;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  url?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
