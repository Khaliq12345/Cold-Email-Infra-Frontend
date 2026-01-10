export interface MailInbox {
  username: string;
  active: 1 | 0;
  active_int: 1 | 0;
  domain: string;
  name: string;
  local_part: string;
  quota: number;
  messages: number;
  attributes: {
    force_pw_update: "0" | "1";
    tls_enforce_in: "0" | "1";
    tls_enforce_out: "0" | "1";
    sogo_access: "0" | "1";
    imap_access: "0" | "1";
    pop3_access: "0" | "1";
    smtp_access: "0" | "1";
    sieve_access: "0" | "1";
    relayhost: string;
    passwd_update: string; // YYYY-MM-DD HH:mm:ss
    mailbox_format: string;
    quarantine_notification: string;
    quarantine_category: string;
    attribute_hash: string;
  };
  custom_attributes: unknown[];
  quota_used: number;
  percent_in_use: number;
  created: string; // YYYY-MM-DD HH:mm:ss
  modified: string;
  authsource: string;
  percent_class: string;
  last_imap_login: number;
  last_smtp_login: number;
  last_pop3_login: number;
  last_sso_login: number;
  max_new_quota: number;
  spam_aliases: number;
  pushover_active: number;
  rl: {
    value: string;
    frame: "d" | "h" | "m";
  };
  rl_scope: string;
  is_relayed: 0 | 1;
}
