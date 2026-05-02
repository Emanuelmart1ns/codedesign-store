import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { verifyAdminToken } from "@/lib/auth-guard";

export async function GET(request: NextRequest) {
  const auth = await verifyAdminToken(request);
  if ("error" in auth) return auth.error;

  try {
    const db = getAdminDb();
    const snapshot = await db.collection("blog").orderBy("createdAt", "desc").get();
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao carregar posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await verifyAdminToken(request);
  if ("error" in auth) return auth.error;

  try {
    const data = await request.json();
    const db = getAdminDb();
    await db.collection("blog").add({ ...data, createdAt: new Date().toISOString(), views: 0 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar post" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await verifyAdminToken(request);
  if ("error" in auth) return auth.error;

  try {
    const { id } = await request.json();
    const db = getAdminDb();
    await db.collection("blog").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao eliminar post" }, { status: 500 });
  }
}
