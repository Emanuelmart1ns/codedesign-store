import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { verifyAdminToken } from "@/lib/auth-guard";

export async function GET(request: NextRequest) {
  const auth = await verifyAdminToken(request);
  if ("error" in auth) return auth.error;

  try {
    const db = getAdminDb();
    
    const contactsSnapshot = await db.collection("contacts").get();
    const projectsSnapshot = await db.collection("projects").get();
    const clientsSnapshot = await db.collection("clients").get();
    const pendingSnapshot = await db.collection("contacts").where("status", "==", "new").get();

    return NextResponse.json({
      totalContacts: contactsSnapshot.size,
      totalProjects: projectsSnapshot.size,
      totalClients: clientsSnapshot.size,
      pendingMessages: pendingSnapshot.size,
    });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao carregar estatísticas" }, { status: 500 });
  }
}
