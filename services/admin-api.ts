import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:8000";

export const adminApi = axios.create({
  baseURL: `${API_BASE}/api/admin`,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

adminApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminApi.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      if (!window.location.pathname.includes("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export async function adminLogin(email: string, password: string) {
  const { data } = await adminApi.post("/login", { email, password });
  localStorage.setItem("admin_token", data.token);
  localStorage.setItem("admin_user", JSON.stringify(data.user));
  return data;
}

export async function adminLogout() {
  try { await adminApi.post("/logout"); } catch { /* ignore */ }
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
}

export function getAdminUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("admin_user");
  return raw ? JSON.parse(raw) : null;
}

export async function fetchDashboard() {
  const { data } = await adminApi.get("/dashboard");
  return data;
}

export async function fetchResource(resource: string, params?: Record<string, unknown>) {
  const { data } = await adminApi.get(`/${resource}`, { params });
  return data;
}

export async function createResource(resource: string, body: Record<string, unknown>) {
  const { data } = await adminApi.post(`/${resource}`, body);
  return data;
}

export async function updateResource(resource: string, id: number, body: Record<string, unknown>) {
  const { data } = await adminApi.put(`/${resource}/${id}`, body);
  return data;
}

export async function deleteResource(resource: string, id: number) {
  await adminApi.delete(`/${resource}/${id}`);
}

export async function fetchContacts(params?: Record<string, unknown>) {
  const { data } = await adminApi.get("/contacts", { params });
  return data;
}

export async function updateContactStatus(id: number, status: string) {
  const { data } = await adminApi.patch(`/contacts/${id}`, { status });
  return data;
}

export async function fetchNewsletter() {
  const { data } = await adminApi.get("/newsletter");
  return data;
}

export async function fetchRegistrations(params?: Record<string, unknown>) {
  const { data } = await adminApi.get("/registrations", { params });
  return data;
}

export async function updateRegistrationStatus(id: number, status: string) {
  const { data } = await adminApi.patch(`/registrations/${id}`, { status });
  return data;
}

export async function deleteRegistration(id: number) {
  await adminApi.delete(`/registrations/${id}`);
}

export async function uploadAdminImage(file: File, folder?: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  if (folder) formData.append("folder", folder);
  const { data } = await adminApi.post<{ url: string }>("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.url;
}
