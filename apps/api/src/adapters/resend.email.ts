import type { IEmailService } from '@api/ports/email.port'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/'/g, '&#039;')

export class ResendEmailService implements IEmailService {
  private readonly apiKey = process.env.RESEND_API_KEY

  private get from() {
    return process.env.RESEND_FROM || 'onboarding@resend.dev'
  }

  private async send(payload: Record<string, unknown>) {
    if (!this.apiKey) return
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Resend API ${response.status}: ${text}`)
    }
  }

  async sendMagicLink(to: string, link: string): Promise<void> {
    await this.send({
      from: this.from,
      to: [to],
      subject: 'Your login link',
      text: `Click the link below to log in:\n\n${link}\n\nThis link expires in 15 minutes.`,
      html: `<p>Click the link below to log in:</p><p><a href="${escapeHtml(link)}">${escapeHtml(link)}</a></p><p>This link expires in 15 minutes.</p>`,
    })
  }

  async sendContactNotification(data: { name: string; email: string; message: string }): Promise<void> {
    await this.send({
      from: this.from,
      to: [process.env.CONTACT_TO || '2k22.csai.2213465@gmail.com'],
      reply_to: data.email,
      subject: `Portfolio contact: ${data.name}`,
      text: `New portfolio contact submission\n\nName: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      html: `<h2>New portfolio contact submission</h2><p><strong>Name:</strong> ${escapeHtml(data.name)}</p><p><strong>Email:</strong> ${escapeHtml(data.email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p>`,
    })
  }

  async sendContactAcknowledgement(data: { name: string; email: string; message: string }): Promise<void> {
    await this.send({
      from: this.from,
      to: [data.email],
      subject: 'Thank you for reaching out — Mohammed Zeeshan',
      text: `Hi ${data.name},\n\nThank you for reaching out through Mohammed Zeeshan's portfolio. Your message has been received, and we will be looking forward to helping you.\n\nYour message:\n${data.message}\n\nBest regards,\nMohammed Zeeshan`,
      html: `<p>Hi ${escapeHtml(data.name)},</p><p>Thank you for reaching out through Mohammed Zeeshan's portfolio. Your message has been received, and we will be looking forward to helping you.</p><p><strong>Your message:</strong></p><p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p><p>Best regards,<br />Mohammed Zeeshan</p>`,
    })
  }
}
