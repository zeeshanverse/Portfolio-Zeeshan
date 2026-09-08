import type { IContactRepository } from '@api/ports/contact.repository'
import type { IEmailService } from '@api/ports/email.port'
import type { CreateContactInput, PaginationOpts } from '@portfolio/shared'

export class ContactService {
  constructor(
    private readonly contact: IContactRepository,
    private readonly email?: IEmailService,
  ) {}

  async submit(data: CreateContactInput) {
    const submission = await this.contact.create(data)

    // Email delivery must never make a successful form submission look like a failure.
    if (this.email) {
      const emailResults = await Promise.allSettled([
        this.email.sendContactNotification(data),
        this.email.sendContactAcknowledgement(data),
      ])
      for (const result of emailResults) {
        if (result.status === 'rejected') {
          console.error('[contact] email delivery failed:', result.reason)
        }
      }
    }

    return submission
  }

  getAll(opts: PaginationOpts) {
    return this.contact.findAll(opts)
  }

  delete(id: string) {
    return this.contact.delete(id)
  }
}
