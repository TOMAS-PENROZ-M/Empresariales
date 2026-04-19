const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Función para realizar llamadas a la API con manejo de errores
export async function apiFetch(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API Error");
  }

  return res.json();
}