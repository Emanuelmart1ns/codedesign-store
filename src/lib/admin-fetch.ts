import { auth } from "./firebase";

export async function getAdminAuthHeaders(): Promise<HeadersInit> {
  const user = auth.currentUser;
  if (!user) throw new Error("Utilizador não autenticado.");
  const token = await user.getIdToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
