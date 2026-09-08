export interface IEmailService {
  sendMagicLink(to: string, link: string): Promise<void>
  sendContactNotification(data: { name: string; email: string; message: string }): Promise<void>
  sendContactAcknowledgement(data: { name: string; email: string; message: string }): Promise<void>
}
