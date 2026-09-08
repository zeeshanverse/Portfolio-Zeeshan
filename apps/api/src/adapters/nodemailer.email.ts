import nodemailer from 'nodemailer'
import type { IEmailService } from '@api/ports/email.port'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/'/g, '&#039;')

export class NodemailerEmailService implements IEmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'localhost',
    port: Number(process.env.SMTP_PORT ?? 1025),
    secure: process.env.SMTP_SECURE === 'true',
    ignoreTLS: process.env.SMTP_IGNORE_TLS === 'true',
    auth: process.env.SMTP_USER && process.env.SMTP_PASS
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  })

  private get from() {
    return process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@portfolio.local'
  }

  async sendMagicLink(to: string, link: string): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to,
      subject: 'Your login link',
      text: `Click the link below to log in:\n\n${link}\n\nThis link expires in 15 minutes.`,
      html: `<p>Click the link below to log in:</p><p><a href="${link}">${link}</a></p><p>This link expires in 15 minutes.</p>`,
    })
  }

  async sendContactNotification(data: { name: string; email: string; message: string }): Promise<void> {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('[contact] SMTP_USER/SMTP_PASS not configured; skipping owner notification')
      return
    }
    const to = process.env.CONTACT_TO || '2k22.csai.2213465@gmail.com'
    await this.transporter.sendMail({
      from: this.from,
      to,
      replyTo: data.email,
      subject: `Portfolio contact: ${data.name}`,
      text: `New portfolio contact submission\n\nName: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      html: `<h2>New portfolio contact submission</h2><p><strong>Name:</strong> ${escapeHtml(data.name)}</p><p><strong>Email:</strong> ${escapeHtml(data.email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p>`,
    })
  }

  async sendContactAcknowledgement(data: { name: string; email: string; message: string }): Promise<void> {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('[contact] SMTP_USER/SMTP_PASS not configured; skipping acknowledgement email')
      return
    }
    await this.transporter.sendMail({
      from: this.from,
      to: data.email,
      subject: 'Thank you for reaching out — Mohammed Zeeshan',
      text: `Hi ${data.name},\n\nThank you for reaching out through Mohammed Zeeshan's portfolio. Your message has been received, and we will be looking forward to helping you.\n\nYour message:\n${data.message}\n\nBest regards,\nMohammed Zeeshan`,
      html: `<p>Hi ${escapeHtml(data.name)},</p><p>Thank you for reaching out through Mohammed Zeeshan's portfolio. Your message has been received, and we will be looking forward to helping you.</p><p><strong>Your message:</strong></p><p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p><p>Best regards,<br />Mohammed Zeeshan</p>`,
    })
  }
}
