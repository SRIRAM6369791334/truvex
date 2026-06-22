const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.MAIL_PORT || 587),
  secure: process.env.MAIL_PORT == 465,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function buildHtmlTemplate({ title, message, fields = {}, isUser = false }) {
  const logoUrl = `${process.env.FRONTEND_URL || 'http://172.16.0.10:5173'}/logo.png`;

  const fieldsRows = Object.entries(fields)
    .map(([key, val]) => {
      const label = key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 150px; border-bottom: 1px solid #f1f5f9; vertical-align: top;">${label}:</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9; vertical-align: top;">${val || '—'}</td>
        </tr>
      `;
    })
    .join('');

  return `
    <div style="background-color: #f8fafc; padding: 32px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
        <!-- Header -->
        <div style="background-color: #0f172a; padding: 24px; text-align: center;">
          <img src="${logoUrl}" alt="Truvex" style="height: 48px; width: auto; display: inline-block;" />
        </div>
        
        <!-- Body -->
        <div style="padding: 32px 24px;">
          <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 16px; border-bottom: 2px solid #0d9488; padding-bottom: 8px; display: inline-block;">
            ${title}
          </h2>
          <p style="color: #475569; font-size: 14px; margin-bottom: 24px; white-space: pre-wrap;">${message}</p>
          
          ${Object.keys(fields).length > 0 ? `
            <!-- Details -->
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
              <h4 style="margin-top: 0; margin-bottom: 16px; font-size: 12px; text-transform: uppercase; color: #0d9488; letter-spacing: 0.05em;">Submission Details</h4>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                ${fieldsRows}
              </table>
            </div>
          ` : ''}

          <p style="color: #64748b; font-size: 13px; margin-top: 24px; margin-bottom: 0;">
            Thank you,<br/>
            <strong>Truvex Team</strong>
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          This is an automated notification. Please do not reply directly to this email.<br/>
          Copyright © 2026 Truvex. All rights reserved.<br/>
          Level 4, Trade Centre, BKC, Mumbai 400051, India
        </div>
      </div>
    </div>
  `;
}

async function sendMail({ to, subject, html }) {
  if (process.env.NODE_ENV === 'test') {
    console.log(`[TEST MAIL] to: ${to}, subject: ${subject}`);
    return;
  }
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME || 'Truvex'}" <${process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME}>`,
      to,
      subject,
      html,
    });
    console.log(`[MAIL SENT] MessageId: ${info.messageId}, to: ${to}`);
  } catch (error) {
    console.error(`[MAIL ERROR] Failed to send email to ${to}:`, error);
  }
}

module.exports = {
  sendMail,
  buildHtmlTemplate,
};
