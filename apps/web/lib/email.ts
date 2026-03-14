import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM ?? "NutriTracker <onboarding@resend.dev>";
const APP_URL = process.env.NEXTAUTH_URL ?? "https://nutritracker.vercel.app";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const url = `${APP_URL}/reset-password?token=${token}`;
  return getResend().emails.send({
    from: FROM,
    to: email,
    subject: "Reset your NutriTracker password",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
        <h2 style="margin:0 0 8px;font-size:20px;color:#111">Reset your password</h2>
        <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.6">
          We received a request to reset the password for your NutriTracker account.
          Click the button below to choose a new password. This link expires in&nbsp;1&nbsp;hour.
        </p>
        <a href="${url}" style="display:inline-block;padding:12px 28px;background:#4169E1;color:#fff;border-radius:99px;text-decoration:none;font-size:14px;font-weight:600">
          Reset password →
        </a>
        <p style="margin:24px 0 0;color:#999;font-size:12px">
          If you didn't request this, you can safely ignore this email.<br>
          Link expires in 1 hour.
        </p>
      </div>
    `,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const url = `${APP_URL}/verify-email?token=${token}`;
  return getResend().emails.send({
    from: FROM,
    to: email,
    subject: "Verify your NutriTracker email",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
        <h2 style="margin:0 0 8px;font-size:20px;color:#111">Verify your email</h2>
        <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.6">
          Thanks for signing up! Click below to verify your email address and activate your account.
        </p>
        <a href="${url}" style="display:inline-block;padding:12px 28px;background:#4169E1;color:#fff;border-radius:99px;text-decoration:none;font-size:14px;font-weight:600">
          Verify email →
        </a>
        <p style="margin:24px 0 0;color:#999;font-size:12px">
          If you didn't create a NutriTracker account, you can ignore this email.
        </p>
      </div>
    `,
  });
}
