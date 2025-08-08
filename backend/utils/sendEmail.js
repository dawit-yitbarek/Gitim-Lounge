import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const adminTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL_USER,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

export async function sendVerificationCode(toEmail, code) {
  const mailOptions = {
    from: `"ግጥም Lounge" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your ግጥም Lounge Verification Code",
    html: `
      <div style="background-color: #ebe7e1; font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border-radius: 12px; border: 1px solid #d7bd88;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #10214b; margin-bottom: 5px;">ግጥም Lounge</h1>
          <p style="color: #d0c3ba; font-size: 14px; margin-top: 0;">Your poetic sanctuary</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px 25px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
          <h2 style="color: #10214b; margin-bottom: 10px;">Verify Your Email ✨</h2>
          <p style="color: #333;">Thank you for signing up to <strong>ግጥም Lounge</strong>. To complete your registration, please use the 6-digit code below:</p>

          <div style="margin: 25px 0; text-align: center;">
            <span style="display: inline-block; font-size: 32px; font-weight: bold; color: #0077B6; letter-spacing: 10px; padding: 12px 20px; border-radius: 10px; background-color: #d7bd88;">
              ${code}
            </span>
          </div>

          <p style="color: #555;">This code will expire in <strong>10 minutes</strong>. If you didn’t request this code, you can safely ignore this email.</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #9a8c84; font-size: 12px;">&copy; ${new Date().getFullYear()} ግጥም Lounge. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", toEmail);
  } catch (error) {
    console.error("Error sending verification email:", error.message);
    throw new Error("Email could not be sent");
  }
};


export async function sendResetPasswordEmail(toEmail, code) {
  const mailOptions = {
    from: `"ግጥም Lounge" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset Your ግጥም Lounge Password",
    subject: "Reset Your ግጥም Lounge Password",
    html: `
  <div style="background-color: #ebe7e1; font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border-radius: 12px; border: 1px solid #d7bd88;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="color: #10214b;">ግጥም Lounge</h1>
      <p style="color: #d0c3ba;">Password Reset Request</p>
    </div>

    <div style="background-color: #ffffff; padding: 20px 25px; border-radius: 10px;">
      <p style="color: #333;">A request was made to reset your password. Use the code below to continue:</p>

      <div style="margin: 25px 0; text-align: center;">
        <span style="display: inline-block; font-size: 32px; font-weight: bold; color: #0077B6; letter-spacing: 10px; padding: 12px 20px; border-radius: 10px; background-color: #d7bd88;">
          ${code}
        </span>
      </div>

      <p style="color: #555;">This code will expire in <strong>10 minutes</strong>. If you didn’t request a password reset, you can ignore this email.</p>
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <p style="color: #9a8c84; font-size: 12px;">&copy; ${new Date().getFullYear()} ግጥም Lounge. All rights reserved.</p>
    </div>
  </div>
`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset password email sent to:", toEmail);
  } catch (error) {
    console.error("Error sending reset email:", error.message);
    throw new Error("Reset email could not be sent");
  }
}



export async function sendContactMessage(name, email, message) {
  const mailOptions = {
    from: `"ግጥም Lounge Contact Form" <${process.env.ADMIN_EMAIL_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    subject: "New Message from ግጥም Lounge Contact Form",
    html: `
  <div style="background-color: #f9f8f6; font-family: Arial, sans-serif; padding: 20px;">
    <h2 style="color: #10214b;">New Contact Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p style="background-color: #fff; padding: 15px; border-radius: 8px; border-left: 4px solid #0077B6;">${message}</p>
    <p style="margin-top: 20px; font-size: 12px; color: #aaa;">Sent on ${new Date().toLocaleString()}</p>
  </div>
`
  };

  try {
    await adminTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending contact message:", error.message);
    throw new Error("Contact message could not be sent");
  }
}