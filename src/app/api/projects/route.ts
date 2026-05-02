import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { verifyAdminToken } from "@/lib/auth-guard";

export async function GET(request: NextRequest) {
  const auth = await verifyAdminToken(request);
  if ("error" in auth) return auth.error;

  try {
    const db = getAdminDb();
    const snapshot = await db.collection("projects").orderBy("createdAt", "desc").get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao carregar projetos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await verifyAdminToken(request);
  if ("error" in auth) return auth.error;

  try {
    const data = await request.json();
    const db = getAdminDb();
    await db.collection("projects").add({ ...data, createdAt: new Date().toISOString() });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar projeto" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await verifyAdminToken(request);
  if ("error" in auth) return auth.error;

  try {
    const { id } = await request.json();
    const db = getAdminDb();
    await db.collection("projects").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao eliminar projeto" }, { status: 500 });
  }
}
