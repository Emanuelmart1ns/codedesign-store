import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { verifyAdminToken } from "@/lib/auth-guard";

export async function GET(request: NextRequest) {
  const auth = await verifyAdminToken(request);
  if ("error" in auth) return auth.error;

  try {
    const db = getAdminDb();
    const snapshot = await db.collection("contacts").orderBy("createdAt", "desc").get();
    const contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ contacts });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao carregar contactos" }, { status: 500 });
  }
}
