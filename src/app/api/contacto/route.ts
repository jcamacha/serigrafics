// POST /api/contacto — valida, filtra spam (NLP básico) y envía correo vía Resend
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const rateMap = new Map<string, number>();
const dailyMap = new Map<string, number>(); // conteo diario por IP
const DAILY_LIMIT = 5; // máximo 5 correos por IP por día
const TO_EMAIL = "crtainboy@gmail.com";

// --- Filtro anti-spam (EN + ES) + detector de idioma ---
const SPAM_WORDS = [
  // Inglés
  "viagra", "cialis", "casino", "poker", "blackjack", "lottery", "prize",
  "winner", "click here", "buy now", "free money", "work from home",
  "earn money", "SEO", "backlink", "guest post", "buy followers",
  "crypto", "bitcoin", "blockchain", "investment", "loan", "refinance",
  "sex", "porn", "xxx", "escort", "dating", "hookup", "nude", "onlyfans",
  "seo services", "digital marketing agency", "link building",
  "congratulations", "you have been selected", "claim your", "act now",
  "limited offer", "exclusive deal", "100% free", "order now", "call now",
  "weight loss", "diet pill", "muscle", "testosterone", "phentermine",
  "payday", "debt", "bankruptcy", "insurance quote", "car donation",
  // Español
  "viagra", "cialis", "casino", "póker", "lotería", "premio", "ganador",
  "haz clic aquí", "compra ahora", "dinero gratis", "trabaja desde casa",
  "gana dinero", "seo", "backlink", "guest post", "comprar seguidores",
  "cripto", "bitcoin", "blockchain", "inversión", "préstamo", "refinancia",
  "sexo", "porno", "xxx", "scort", "citas", "onlyfans", "desnudo",
  "servicios seo", "agencia marketing digital", "link building",
  "felicidades", "has sido seleccionado", "reclama tu", "actúa ya",
  "oferta limitada", "trato exclusivo", "100% gratis", "pide ahora",
  "pérdida de peso", "pastilla para adelgazar", "músculo", "testosterona",
  "préstamo rápido", "deuda", "bancarrota", "seguro de coche",
  "curandero", "brujería", "amarres", "hechizo",
];

const SPAM_PATTERNS = [
  /https?:\/\/[^\s]+/gi,           // URLs
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, // emails en mensaje
];

// Scripts no latinos (bloquear: cirílico, chino, japonés, árabe, etc.)
const NON_LATIN = /[\u0400-\u04FF\u0600-\u06FF\u0900-\u097F\u1100-\u11FF\u3040-\u309F\u30A0-\u30FF\u3130-\u318F\uAC00-\uD7AF\u4E00-\u9FFF\u0E00-\u0E7F]/;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-záéíóúñ0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function isSpam(nombre: string, mensaje: string): string | null {
  const mensajeTokens = tokenize(mensaje);
  const mensajeLower = mensaje.toLowerCase();
  const allText = `${nombre} ${mensaje}`.toLowerCase();

  // 0. Detector de idioma: solo inglés y español (alfabeto latino)
  if (NON_LATIN.test(nombre) || NON_LATIN.test(mensaje)) {
    return "Solo se aceptan mensajes en español o inglés.";
  }

  // 1. Palabras ofensivas / spam
  for (const word of SPAM_WORDS) {
    if (allText.includes(word)) {
      return "Contenido no permitido detectado.";
    }
  }

  // 2. Múltiples URLs
  let urlCount = 0;
  for (const pattern of SPAM_PATTERNS) {
    const matches = mensajeLower.match(pattern);
    if (matches) urlCount += matches.length;
  }
  if (urlCount > 2) {
    return "Demasiados enlaces en el mensaje.";
  }

  // 3. Mensaje muy corto o muy largo
  if (mensajeTokens.length < 4) {
    return "Por favor describe tu proyecto con más detalle.";
  }
  if (mensaje.length > 2000) {
    return "El mensaje es demasiado largo (máximo 2000 caracteres).";
  }

  // 4. Nombre con números o caracteres raros
  if (/[0-9]{3,}/.test(nombre) || /[<>{}]/.test(nombre)) {
    return "El nombre contiene caracteres no válidos.";
  }

  // 5. Repetición excesiva de palabras (spam SEO)
  const wordFreq: Record<string, number> = {};
  for (const t of mensajeTokens) {
    wordFreq[t] = (wordFreq[t] || 0) + 1;
  }
  for (const [word, count] of Object.entries(wordFreq)) {
    if (count > 10 && word.length > 3) {
      return "El mensaje contiene demasiadas repeticiones.";
    }
  }

  return null; // No es spam
}
// --- Fin filtro anti-spam ---


export async function POST(request: NextRequest) {
  // Rate limit: 2 solicitudes por minuto por IP (más estricto)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const now = Date.now();
  const windowStart = now - 60_000;

  for (const [key, timestamp] of rateMap) {
    if (timestamp < windowStart) rateMap.delete(key);
  }

  const recentRequests = [...rateMap.entries()].filter(
    ([key, ts]) => key.startsWith(ip) && ts > windowStart
  ).length;

  if (recentRequests >= 2) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." },
      { status: 429 }
    );
  }

  rateMap.set(`${ip}-${now}`, now);

  // Daily limit: máximo 5 correos por IP por día
  const today = new Date().toDateString();
  const dailyKey = `${ip}-${today}`;
  const dailyCount = dailyMap.get(dailyKey) || 0;
  if (dailyCount >= DAILY_LIMIT) {
    return NextResponse.json(
      { ok: true, mensaje: "Solicitud recibida. Te contactaremos pronto." },
      { status: 200 }
    );
  }

  // Validar body
  let body: { nombre?: string; telefono?: string; mensaje?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const nombre = body.nombre?.trim() || "";
  const telefono = body.telefono?.trim() || "";
  const mensaje = body.mensaje?.trim() || "";

  if (nombre.length < 2) {
    return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  }

  // Teléfono: SOLO números, EXACTAMENTE 10 dígitos
  const telLimpio = telefono.replace(/\D/g, "");
  if (!/^\d{10}$/.test(telLimpio)) {
    return NextResponse.json(
      { error: "El teléfono debe tener exactamente 10 dígitos." },
      { status: 400 }
    );
  }

  if (mensaje.length < 10) {
    return NextResponse.json({ error: "Descríbenos tu proyecto (mínimo 10 caracteres)." }, { status: 400 });
  }

  // Filtro NLP anti-spam
  const spamReason = isSpam(nombre, mensaje);
  if (spamReason) {
    console.log(`[Spam bloqueado] IP: ${ip} | Razón: ${spamReason}`);
    // Respondemos OK para no dar pistas al bot, pero no enviamos correo
    return NextResponse.json({
      ok: true,
      mensaje: "Solicitud recibida. Te contactaremos pronto.",
    });
  }

  // Enviar correo vía Resend
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Más Imagen <onboarding@resend.dev>",
      to: TO_EMAIL,
      subject: `Cotización de ${nombre}`,
      replyTo: undefined as never,
      html: `
        <h2>Nueva solicitud de cotización — Más Imagen</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap;">${mensaje}</p>
        <hr />
        <p style="color:#888;font-size:12px;">Recibido desde el formulario de contacto</p>
      `,
    });

    // Incrementar contador diario
    dailyMap.set(dailyKey, dailyCount + 1);

    return NextResponse.json({
      ok: true,
      mensaje: "Solicitud recibida. Te contactaremos pronto.",
    });
  } catch (err) {
    console.error("[Contacto] Error enviando correo:", err);
    return NextResponse.json({
      ok: true,
      mensaje: "Solicitud recibida. Te contactaremos pronto.",
    });
  }
}
