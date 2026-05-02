import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();
    if (!idToken) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);
    const db = getAdminDb();
    const userRef = db.collection("users").doc(decodedToken.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      const providerData = decodedToken.firebase.sign_in_provider || "unknown";
      await userRef.set({
        email: decodedToken.email || "",
        displayName: decodedToken.name || decodedToken.email?.split("@")[0] || "",
        photoURL: decodedToken.picture || "",
        role: "customer",
        provider: providerData,
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ role: "customer", displayName: decodedToken.name || decodedToken.email?.split("@")[0] });
    }

    const userData = userDoc.data();
    return NextResponse.json({
      role: userData?.role || "customer",
      displayName: userData?.displayName || decodedToken.email?.split("@")[0],
      provider: userData?.provider || "unknown",
      createdAt: userData?.createdAt || new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
