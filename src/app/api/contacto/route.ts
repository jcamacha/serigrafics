// POST /api/contacto — valida, rate-limits y envía correo vía Resend
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const rateMap = new Map<string, number>();
const TO_EMAIL = "crtainboy@gmail.com";

export async function POST(request: NextRequest) {
  // Rate limit: 3 solicitudes por minuto por IP
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

  if (recentRequests >= 3) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." },
      { status: 429 }
    );
  }

  rateMap.set(`${ip}-${now}`, now);

  // Validar body
  let body: { nombre?: string; telefono?: string; mensaje?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  if (!body.nombre || body.nombre.trim().length < 2) {
    return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  }
  if (!body.telefono || body.telefono.trim().length < 7) {
    return NextResponse.json({ error: "El teléfono es obligatorio." }, { status: 400 });
  }
  if (!body.mensaje || body.mensaje.trim().length < 10) {
    return NextResponse.json({ error: "Descríbenos tu proyecto (mínimo 10 caracteres)." }, { status: 400 });
  }

  const telLimpio = body.telefono.replace(/\D/g, "");
  if (telLimpio.length < 10) {
    return NextResponse.json({ error: "El teléfono debe tener al menos 10 dígitos." }, { status: 400 });
  }

  // Enviar correo vía Resend
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Más Imagen <onboarding@resend.dev>",
      to: TO_EMAIL,
      subject: `Cotización de ${body.nombre.trim()}`,
      replyTo: undefined as never, // Resend no requiere reply-to en test mode
      html: `
        <h2>Nueva solicitud de cotización — Más Imagen</h2>
        <p><strong>Nombre:</strong> ${body.nombre.trim()}</p>
        <p><strong>Teléfono:</strong> ${body.telefono.trim()}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap;">${body.mensaje.trim()}</p>
        <hr />
        <p style="color:#888;font-size:12px;">Recibido desde el formulario de contacto</p>
      `,
    });

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
