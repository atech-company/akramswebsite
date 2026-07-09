import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

export default api;

export async function fetchApi<T>(endpoint: string, params?: Record<string, unknown>): Promise<T | null> {
  try {
    const { data } = await api.get<T>(endpoint, { params });
    return data;
  } catch {
    return null;
  }
}

export async function postApi<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  const { data } = await api.post<T>(endpoint, body);
  return data;
}

export async function uploadPublicImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<{ url: string }>("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.url;
}
