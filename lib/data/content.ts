import { apiFetch, asStringArray } from "@/lib/api/fetch";
import type {
  BlogPost,
  CareerPosition,
  Course,
  Event,
  GalleryItem,
  PaginatedResponse,
  Partner,
  PortfolioProject,
  Product,
  Service,
  TeamMember,
  Testimonial,
} from "@/types";

function normalizeCourse(course: Course): Course {
  return { ...course, technologies: asStringArray(course.technologies) };
}

function normalizeService(service: Service): Service {
  return { ...service, technologies: asStringArray(service.technologies) };
}

function normalizePortfolio(project: PortfolioProject): PortfolioProject {
  return { ...project, technologies: asStringArray(project.technologies) };
}

export async function getCourses(): Promise<Course[]> {
  const res = await apiFetch<PaginatedResponse<Course>>("/courses?per_page=50");
  return (res?.data ?? []).map(normalizeCourse);
}

export async function getFeaturedCourses(): Promise<Course[]> {
  const res = await apiFetch<PaginatedResponse<Course>>("/courses/featured");
  return (res?.data ?? []).map(normalizeCourse);
}

export async function getCourse(slug: string): Promise<Course | null> {
  const res = await apiFetch<{ data: Course }>(`/courses/${slug}`);
  return res?.data ? normalizeCourse(res.data) : null;
}

export async function getCourseSlugs(): Promise<string[]> {
  const courses = await getCourses();
  return courses.map((c) => c.slug);
}

export async function getPortfolio(featured = false): Promise<PortfolioProject[]> {
  const query = featured ? "?featured=1&per_page=8" : "?per_page=50";
  const res = await apiFetch<PaginatedResponse<PortfolioProject>>(`/portfolio${query}`);
  return (res?.data ?? []).map(normalizePortfolio);
}

export async function getPortfolioProject(slug: string): Promise<PortfolioProject | null> {
  const res = await apiFetch<{ data: PortfolioProject }>(`/portfolio/${slug}`);
  return res?.data ? normalizePortfolio(res.data) : null;
}

export async function getPortfolioSlugs(): Promise<string[]> {
  const items = await getPortfolio();
  return items.map((p) => p.slug);
}

export async function getProducts(featured = false): Promise<Product[]> {
  const query = featured ? "?featured=1&per_page=8" : "?per_page=50";
  const res = await apiFetch<PaginatedResponse<Product>>(`/products${query}`);
  return res?.data ?? [];
}

export async function getProduct(slug: string): Promise<Product | null> {
  const res = await apiFetch<{ data: Product }>(`/products/${slug}`);
  return res?.data ?? null;
}

export async function getProductSlugs(): Promise<string[]> {
  const items = await getProducts();
  return items.map((p) => p.slug);
}

export async function getServices(featured = false): Promise<Service[]> {
  const query = featured ? "?featured=1" : "";
  const res = await apiFetch<PaginatedResponse<Service>>(`/services${query}`);
  return (res?.data ?? []).map(normalizeService);
}

export async function getService(slug: string): Promise<Service | null> {
  const res = await apiFetch<{ data: Service }>(`/services/${slug}`);
  return res?.data ? normalizeService(res.data) : null;
}

export async function getServiceSlugs(): Promise<string[]> {
  const items = await getServices();
  return items.map((s) => s.slug);
}

export async function getBlogPosts(limit = 50): Promise<BlogPost[]> {
  const res = await apiFetch<PaginatedResponse<BlogPost>>(`/blog?per_page=${limit}`);
  return res?.data ?? [];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await apiFetch<{ data: BlogPost }>(`/blog/${slug}`);
  return res?.data ?? null;
}

export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((p) => p.slug);
}

export async function getEvents(): Promise<Event[]> {
  const res = await apiFetch<Event[]>("/events");
  return res ?? [];
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const res = await apiFetch<PaginatedResponse<GalleryItem>>("/gallery?per_page=100");
  return res?.data ?? [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await apiFetch<Testimonial[]>("/testimonials");
  return res ?? [];
}

export async function getPartners(): Promise<Partner[]> {
  const res = await apiFetch<Partner[]>("/partners");
  return res ?? [];
}

export async function getTeam(): Promise<TeamMember[]> {
  const res = await apiFetch<TeamMember[]>("/team");
  return res ?? [];
}

export async function getCareers(): Promise<CareerPosition[]> {
  const res = await apiFetch<CareerPosition[]>("/careers");
  return res ?? [];
}
