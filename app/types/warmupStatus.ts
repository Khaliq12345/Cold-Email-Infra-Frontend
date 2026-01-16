interface WarmupStatus {
  status: "success" | "error";
  emailAcc: {
    google_percent: number;
    other_percent: string;
    microsoft_percent: string;
    total_inbox_sent: number;
    total_spam_sent: number;
    total_promotion_sent: number;
    total_warmup_sent: number;
    inbox_percent: string;
    spam_percent: string;
    promotion_percent: string;
    chart_data: Array<{
      date: string;
      dt: string;
      sent: number;
      inbox: number;
      spam: number;
      promotion: number;
    }>;
    total_inboxes: number;
    total_domains: number;
    email_domain_detail: Record<string, never>;
  };
}
