import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const db = getAdminDb();
    const doc = await db.collection("settings").doc("global").get();
    if (doc.exists) {
      return NextResponse.json(doc.data());
    }
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error: "Erro ao carregar settings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = getAdminDb();
    await db.collection("settings").doc("global").set(body, { merge: true });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao guardar settings" }, { status: 500 });
  }
}
