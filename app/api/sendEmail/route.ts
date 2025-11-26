// app/api/sendEmail/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Use your Resend API key
const resend = new Resend("re_DnEW5uR4_AhGQPYuAyquwV29d2eDV1vsZ");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, config, price, imageUrl } = body;

    // HTML Email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
        <div style="background:#1a1a1a; color:white; padding:20px; text-align:center;">
          <h1 style="margin:0; font-size:24px;">Your Eve Configuration</h1>
        </div>

        <div style="padding:20px;">
          ${imageUrl ? `<img src="${imageUrl}" alt="Your Eve Configuration" style="width:100%; height:auto; border-radius:6px; margin-bottom:20px;"/>` : ""}
          
          <h2 style="font-size:18px; margin-bottom:10px;">Selected Options</h2>
          <table style="width:100%; border-collapse: collapse; margin-bottom:20px;">
            <tbody>
              ${Object.entries(config).map(([key, value]) => `
                <tr>
                  <td style="padding:8px; border:1px solid #ddd; font-weight:bold; text-transform:capitalize;">${key}</td>
                  <td style="padding:8px; border:1px solid #ddd;">${value}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <p style="font-size:16px;"><strong>Total Price:</strong> $${price}</p>
          
          <div style="margin-top:30px; padding:15px; background:#f4f4f4; border-radius:6px; text-align:center;">
            Thank you for configuring your Eve. We will process your preorder shortly!
          </div>
        </div>

        <div style="background:#1a1a1a; color:white; text-align:center; padding:10px; font-size:12px;">
          &copy; ${new Date().getFullYear()} Ascendance. All rights reserved.
        </div>
      </div>
    `;

    // Plain text fallback
    const textContent = `
Your Eve Configuration:

${Object.entries(config).map(([k,v]) => `${k}: ${v}`).join("\n")}

Total Price: $${price}

Thank you for configuring your Eve!
`;

    const response = await resend.emails.send({
      from: "Ascendance <onboarding@resend.dev>", // verified sender
      to: email,
      subject: "Your Eve Configuration",
      text: textContent,
      html: htmlContent,
    });

    console.log("Resend response:", response);

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
