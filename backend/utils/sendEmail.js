import Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

// Initialize Brevo HTTP API client
const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);


// Send Verification Code
export async function sendVerificationCode(toEmail, code) {
  const html = `
    <div style="background-color: #ebe7e1; font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border-radius: 12px; border: 1px solid #d7bd88;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #10214b; margin-bottom: 5px;">ግጥም Lounge</h1>
        <p style="color: #d0c3ba; font-size: 14px; margin-top: 0;">Your poetic sanctuary</p>
      </div>

      <div style="background-color: #ffffff; padding: 20px 25px; border-radius: 10px;">
        <h2 style="color: #10214b; margin-bottom: 10px;">Verify Your Email ✨</h2>
        <p style="color: #333;">Use the 6-digit verification code below:</p>

        <div style="margin: 25px 0; text-align: center;">
          <span style="display: inline-block; font-size: 32px; font-weight: bold; color: #0077B6; letter-spacing: 10px; padding: 12px 20px; border-radius: 10px; background-color: #d7bd88;">
            ${code}
          </span>
        </div>

        <p style="color: #555;">This code expires in <strong>10 minutes</strong>.</p>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #9a8c84; font-size: 12px;">&copy; ${new Date().getFullYear()} ግጥም Lounge</p>
      </div>
    </div>
  `;

  try {
    await apiInstance.sendTransacEmail({
      sender: {
        name: "ግጥም Lounge",
        email: process.env.EMAIL_USER,
      },
      to: [{ email: toEmail }],
      subject: "Your ግጥም Lounge Verification Code",
      htmlContent: html,
    });

    console.log("Verification email sent:", toEmail);
  } catch (error) {
    console.error("Error sending verification email:", error.message);
    throw new Error("Email could not be sent");
  }
}


// Send Reset Password Email
export async function sendResetPasswordEmail(toEmail, code) {
  const html = `
    <div style="background-color: #ebe7e1; font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border-radius: 12px; border: 1px solid #d7bd88;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #10214b;">ግጥም Lounge</h1>
        <p style="color: #d0c3ba;">Password Reset Request</p>
      </div>

      <div style="background-color: #ffffff; padding: 20px 25px; border-radius: 10px;">
        <p style="color: #333;">Use the code below to reset your password:</p>

        <div style="margin: 25px 0; text-align: center;">
          <span style="display: inline-block; font-size: 32px; font-weight: bold; color: #0077B6; letter-spacing: 10px; padding: 12px 20px; border-radius: 10px; background-color: #d7bd88;">
            ${code}
          </span>
        </div>

        <p style="color: #555;">This code expires in <strong>10 minutes</strong>.</p>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #9a8c84; font-size: 12px;">&copy; ${new Date().getFullYear()} ግጥም Lounge</p>
      </div>
    </div>
  `;

  try {
    await apiInstance.sendTransacEmail({
      sender: {
        name: "ግጥም Lounge",
        email: process.env.EMAIL_USER,
      },
      to: [{ email: toEmail }],
      subject: "Reset Your ግጥም Lounge Password",
      htmlContent: html,
    });

    console.log("Reset password email sent:", toEmail);
  } catch (error) {
    console.error("Error sending reset email:", error.message);
    throw new Error("Reset email could not be sent");
  }
}


// Send Contact Message
export async function sendContactMessage(name, email, message) {
  const html = `
    <div style="background-color: #f9f8f6; font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #10214b;">New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="background-color: #fff; padding: 15px; border-radius: 8px; border-left: 4px solid #0077B6;">
        ${message}
      </p>
      <p style="margin-top: 20px; font-size: 12px; color: #aaa;">
        Sent on ${new Date().toLocaleString()}
      </p>
    </div>
  `;

  try {
    await apiInstance.sendTransacEmail({
      sender: {
        name: "ግጥም Lounge Contact Form",
        email: process.env.EMAIL_USER,
      },
      to: [{ email: process.env.CONTACT_RECEIVER_EMAIL }],
      subject: "New Message from ግጥም Lounge Contact Form",
      htmlContent: html,
      replyTo: { email },
    });

    console.log("Contact message sent");
  } catch (error) {
    console.error("Error sending contact message:", error.message);
    throw new Error("Contact message could not be sent");
  }
}