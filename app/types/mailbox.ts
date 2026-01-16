export interface Mailbox {
  id: string;
  email: string;
  status: string;
  warmup_status: string;
}

export interface MailboxApiResponse {
  message: string;
  data: Mailbox[];
}
