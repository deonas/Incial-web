const getToken = () =>
  typeof window !== "undefined"
    ? localStorage.getItem("admin_token") || ""
    : "";

export async function apiLogin(secret: string): Promise<boolean> {
  const res = await fetch("/api/admin/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret }),
  });
  if (res.ok) {
    localStorage.setItem("admin_token", secret);
    return true;
  }
  return false;
}

export function apiLogout() {
  localStorage.removeItem("admin_token");
}

export function isLoggedIn(): boolean {
  return Boolean(
    typeof window !== "undefined" && localStorage.getItem("admin_token")
  );
}

export async function apiGetSection<T>(section: string): Promise<T> {
  const res = await fetch(`/api/admin/${section}`);
  if (!res.ok) throw new Error(`Failed to load ${section}`);
  return res.json();
}

export async function apiSaveSection<T>(section: string, data: T): Promise<void> {
  const res = await fetch(`/api/admin/${section}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Failed to save ${section}`);
  }
}
