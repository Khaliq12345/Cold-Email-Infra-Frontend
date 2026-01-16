// export interface Mailbox {
//   id: string;
//   email: string;
//   status: string;
//   warmup_status: string;
// }

export interface Mailbox {
  id: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  warmup_status: "ACTIVE" | "INACTIVE";
  provider: "REGULAR_ACCOUNT";
  warmup_enb_dt: string;
  timestamp_created: string;
  timestamp_updated: string;
  payload: {
    name: {
      first_name: string;
      last_name: string;
    };
    warmup: {
      limit: number;
      warmup_custom_words: string;
      warmup_signature: number;
      advanced: {
        warm_ctd: boolean;
        weekday_only: boolean;
        warmup_business_type: string;
      };
      increment: number;
      reply_rate: number;
    };
    imap_host: string;
    imap_port: number;
    smtp_host: string;
    smtp_port: number;
    daily_limit: number;
    sending_gap: number;
    reply_to: string;
    custom_domain: string;
    signature: string;
    tags: any[];
    cmps: any[];
    analytics: {
      health_scores: {
        "7d_overall_warmup_health": number;
        "7d_google_warmup_health": number;
        "7d_microsoft_warmup_health": number;
        "7d_other_warmup_health": number;
        "1d_miss_warmup_rate": number;
        "3d_bounce_rate": number;
      };
      reply_rates: {
        "7d_ooo_replyrate": number;
        "7d_replyrate": number;
      };
      daily_counters: {
        email_sent_today: number;
        warmup_email_sent_today: number;
      };
    };
  };
}

export interface MailboxApiResponse {
  message: string;
  data: Mailbox[];
}
