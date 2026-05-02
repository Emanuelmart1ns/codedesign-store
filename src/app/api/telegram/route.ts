import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function sendTelegramNotification(text: string) {
  try {
    const db = getAdminDb();
    const settingsDoc = await db.collection("settings").doc("global").get();
    const settings = settingsDoc.data();
    const socials = settings?.socials;

    const BOT_TOKEN = socials?.telegramToken;
    const CHAT_ID = socials?.telegramChatId;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.warn("Telegram: Configurações ausentes.");
      return null;
    }

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "Markdown",
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erro ao enviar Telegram:", error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, text, action, webhookUrl } = body;

    if (action === "set_webhook") {
      const db = getAdminDb();
      const settingsDoc = await db.collection("settings").doc("global").get();
      const settings = settingsDoc.data();
      const BOT_TOKEN = settings?.socials?.telegramToken;

      if (!BOT_TOKEN) {
        return NextResponse.json({ error: "Token Telegram não configurado" }, { status: 400 });
      }

      const webhookResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: webhookUrl }),
      });

      const data = await webhookResponse.json();
      return NextResponse.json(data);
    }

    await sendTelegramNotification(`💬 *${name || "Visitante"}*\n\n${text}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 });
  }
}
