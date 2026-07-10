import {
  BookOpen, Briefcase, Calendar, Cpu, FileText, HelpCircle, Image,
  LayoutDashboard, Mail, MessageSquare, Package, Settings, Star,
  Users, Layers, Wrench, ClipboardList,
} from "lucide-react";

export interface ResourceConfig {
  key: string;
  label: string;
  singular: string;
  icon: React.ElementType;
  fields: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "select" | "json" | "date" | "image";
  options?: { value: string; label: string }[];
  required?: boolean;
}

export const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen, resource: "courses" },
  { href: "/admin/services", label: "Services", icon: Wrench, resource: "services" },
  { href: "/admin/products", label: "Products", icon: Package, resource: "products" },
  { href: "/admin/portfolio", label: "Portfolio", icon: Layers, resource: "portfolio" },
  { href: "/admin/blog", label: "Blog", icon: FileText, resource: "blog" },
  { href: "/admin/events", label: "Events", icon: Calendar, resource: "events" },
  { href: "/admin/gallery", label: "Gallery", icon: Image, resource: "gallery" },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star, resource: "testimonials" },
  { href: "/admin/team", label: "Team", icon: Users, resource: "team" },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle, resource: "faqs" },
  { href: "/admin/partners", label: "Partners", icon: Cpu, resource: "partners" },
  { href: "/admin/careers", label: "Careers", icon: Briefcase, resource: "careers" },
  { href: "/admin/categories", label: "Categories", icon: Settings, resource: "categories" },
  { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/admin/registrations", label: "Registrations", icon: ClipboardList },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

export const resourceConfigs: Record<string, ResourceConfig> = {
  courses: {
    key: "courses", label: "Courses", singular: "Course", icon: BookOpen,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "instructor", label: "Instructor", type: "text" },
      { name: "difficulty", label: "Difficulty", type: "select", options: [
        { value: "beginner", label: "Beginner" }, { value: "intermediate", label: "Intermediate" }, { value: "advanced", label: "Advanced" },
      ]},
      { name: "price", label: "Price", type: "number" },
      { name: "duration_hours", label: "Duration (hours)", type: "number" },
      { name: "lessons_count", label: "Lessons", type: "number" },
      { name: "students_count", label: "Students", type: "number" },
      { name: "rating", label: "Rating", type: "number" },
      { name: "thumbnail", label: "Image", type: "image" },
      { name: "is_featured", label: "Featured", type: "boolean" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  services: {
    key: "services", label: "Services", singular: "Service", icon: Wrench,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon", type: "text" },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "is_featured", label: "Featured", type: "boolean" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  products: {
    key: "products", label: "Products", singular: "Product", icon: Package,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "price", label: "Price", type: "number" },
      { name: "thumbnail", label: "Image", type: "image" },
      { name: "buy_url", label: "Buy URL", type: "text" },
      { name: "is_featured", label: "Featured", type: "boolean" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  portfolio: {
    key: "portfolio", label: "Portfolio", singular: "Project", icon: Layers,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "client", label: "Client", type: "text" },
      { name: "result", label: "Result", type: "textarea" },
      { name: "thumbnail", label: "Image", type: "image" },
      { name: "is_featured", label: "Featured", type: "boolean" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  blog: {
    key: "blog", label: "Blog Posts", singular: "Post", icon: FileText,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "content", label: "Content (Markdown)", type: "textarea", required: true },
      { name: "thumbnail", label: "Image", type: "image" },
      { name: "read_time", label: "Read Time (min)", type: "number" },
      { name: "is_featured", label: "Featured", type: "boolean" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  events: {
    key: "events", label: "Events", singular: "Event", icon: Calendar,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "starts_at", label: "Starts At", type: "date" },
      { name: "price", label: "Price", type: "number" },
      { name: "is_featured", label: "Featured", type: "boolean" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  gallery: {
    key: "gallery", label: "Gallery", singular: "Item", icon: Image,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "image", label: "Image", type: "image", required: true },
      { name: "category", label: "Category", type: "text" },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  testimonials: {
    key: "testimonials", label: "Testimonials", singular: "Testimonial", icon: Star,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "company", label: "Company", type: "text" },
      { name: "content", label: "Content", type: "textarea", required: true },
      { name: "rating", label: "Rating", type: "number" },
      { name: "is_featured", label: "Featured", type: "boolean" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  team: {
    key: "team", label: "Team", singular: "Member", icon: Users,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "avatar", label: "Avatar", type: "image" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  faqs: {
    key: "faqs", label: "FAQs", singular: "FAQ", icon: HelpCircle,
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "context", label: "Context", type: "text" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  partners: {
    key: "partners", label: "Partners", singular: "Partner", icon: Cpu,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "logo", label: "Logo", type: "image", required: true },
      { name: "url", label: "Website", type: "text" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  careers: {
    key: "careers", label: "Careers", singular: "Position", icon: Briefcase,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "department", label: "Department", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "type", label: "Type", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
  },
  categories: {
    key: "categories", label: "Categories", singular: "Category", icon: Settings,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "type", label: "Type", type: "select", options: [
        { value: "course", label: "Course" }, { value: "blog", label: "Blog" },
        { value: "product", label: "Product" }, { value: "portfolio", label: "Portfolio" },
      ]},
      { name: "is_active", label: "Active", type: "boolean" },
    ],
  },
};
