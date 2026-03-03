/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  // Validación sencilla (suficiente para evitar obvious fails)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, message } = await req.json();

    const safeName = String(name ?? "").slice(0, 200);
    const safeCompany = String(company ?? "").slice(0, 200);
    const safeEmail = String(email ?? "").trim();
    const safeMessage = String(message ?? "").slice(0, 5000);

    const adminPromise = resend.emails.send({
      from: "Contact TEST <contacto@send.studio-test.com>",
      to: ["robejafet@gmail.com"],
      subject: "Contact TEST STUDIO",
      html: `
        <p><b>Name:</b> ${safeName}</p>
        <p><b>Company:</b> ${safeCompany}</p>
        <p><b>Email:</b> ${safeEmail}</p>
        <p><b>Message:</b><br/>${safeMessage.replace(/\n/g, "<br/>")}</p>
      `,
      text: `Nombre: ${safeName}
Company: ${safeCompany}
Email: ${safeEmail}
Subject: Contact TEST STUDIO
Mensaje:
${safeMessage}`,
      replyTo: isValidEmail(safeEmail) ? [safeEmail] : undefined,
    });

    const userPromise =
      isValidEmail(safeEmail)
        ? resend.emails.send({
            from: "TEST STUDIO <contacto@send.studio-test.com>",
            to: [safeEmail],
            subject: "Thanks for contacting TEST STUDIO",
            html: `
              <p>Thank you for reaching out to us!</p>
              <p>Best regards, <b>TEST STUDIO</b></p>
            `,
            text: `Thank you for reaching out to us!\n\nBest regards, TEST STUDIO`,
          })
        : null;

    const results = await Promise.allSettled(
      [adminPromise, userPromise].filter(Boolean) as Promise<any>[]
    );

    const [adminResult, userResult] = results;

    if (adminResult?.status === "rejected" || (adminResult as any)?.value?.error) {
      const err =
        (adminResult as any)?.reason?.message ||
        (adminResult as any)?.value?.error?.message ||
        "Failed to send admin email";
      return NextResponse.json({ error: err, target: "admin" }, { status: 500 });
    }

    if (userResult && (userResult.status === "rejected" || (userResult as any)?.value?.error)) {
      const err =
        (userResult as any)?.reason?.message ||
        (userResult as any)?.value?.error?.message ||
        "Failed to send user email";
      return NextResponse.json(
        { success: true, warning: err, target: "user" },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */