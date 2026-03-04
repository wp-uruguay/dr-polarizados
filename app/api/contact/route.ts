import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "comunicaciones@drpolarizados.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "formulario@drpolarizados.com";

interface ContactPayload {
  origin: string;
  fields: Record<string, string>;
}

const ORIGIN_LABELS: Record<string, string> = {
  contacto: "Formulario de Contacto",
  "final-contact": "Formulario de Contacto (Home)",
  mayoristas: "Formulario de Mayoristas",
  "marca-blanca": "Formulario de Marca Blanca",
  advisory: "Formulario de Asesoramiento",
};

function buildHtmlEmail(origin: string, fields: Record<string, string>) {
  const title = ORIGIN_LABELS[origin] || origin;

  const rows = Object.entries(fields)
    .map(
      ([key, value]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#333;border-bottom:1px solid #eee;white-space:nowrap;vertical-align:top">${key}</td>
        <td style="padding:8px 12px;color:#555;border-bottom:1px solid #eee">${value || "—"}</td>
      </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#ff6b0f;padding:20px 24px;border-radius:8px 8px 0 0">
        <h1 style="color:#fff;margin:0;font-size:18px">${title}</h1>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px">
        <table style="width:100%;border-collapse:collapse">${rows}</table>
        <p style="margin-top:24px;font-size:12px;color:#999">
          Enviado desde drpolarizados.com
        </p>
      </div>
    </div>`;
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY no está configurada.");
    return NextResponse.json(
      { error: "El servicio de email no está configurado." },
      { status: 503 }
    );
  }

  try {
    const body: ContactPayload = await request.json();
    const { origin, fields } = body;

    if (!origin || !fields || Object.keys(fields).length === 0) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    const subject = `${ORIGIN_LABELS[origin] || "Nuevo mensaje"} — Dr Polarizados`;

    const { error } = await resend.emails.send({
      from: `Dr Polarizados <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject,
      html: buildHtmlEmail(origin, fields),
      replyTo: fields.Email || fields.email || undefined,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Error al enviar el email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API contact error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
