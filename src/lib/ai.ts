import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function askAI(prompt: string, context: any) {
  const db = getAdminDb();
  const settingsDoc = await db.collection("settings").doc("global").get();
  const settings = settingsDoc.data();
  const apiKey = process.env.OPENROUTER_API_KEY || settings?.socials?.openRouterKey;
  if (!apiKey) throw new Error("API Key ausente.");

  const systemPrompt = `
    Tu és o Assistente IA da CodeDesign Store.
    A tua missão é ajudar a gerir o site e responder a perguntas sobre os serviços.
    
    SERVIÇOS:
    - Web Design e Desenvolvimento
    - Apps Mobile
    - Agentes IA e Automação
    - Machine Learning
    - Software Personalizado
    
    CONTEXTO ATUAL:
    ${JSON.stringify(context || {})}

    INSTRUÇÕES:
    1. Se o utilizador pedir para criar/editar conteúdo, gera a ação apropriada.
    2. Se tiveres dúvidas, pede clarificação.
    3. RESPONDE EM JSON com: { "message": "resposta", "actions": [] }
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: prompt }],
        temperature: 0,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) throw new Error("Erro na API");
    const result = await response.json();
    let content = result.choices[0].message.content;
    
    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");
    if (start !== -1 && end !== -1) content = content.substring(start, end + 1);
    
    return JSON.parse(content);
  } catch (error: any) {
    return { message: `❌ Erro: ${error.message}`, actions: [] };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, context } = body;
    const result = await askAI(prompt, context);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
