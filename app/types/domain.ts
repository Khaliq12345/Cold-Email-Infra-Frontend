
export interface Domain {
  id: number
  created_at: string          // ISO-8601
  domain: string
  basic_dns: boolean
  dmarc: boolean
  dkim: boolean
  dkim_set_date: string | null
  ptr: boolean
  username: string
  status: 'running' | 'stopped' | 'pending' // ou string si autre valeurs
}

export type DomainList = Domain[] | []

export interface DomainInfo {
  max_new_mailbox_quota: number
  def_new_mailbox_quota: number
  quota_used_in_domain: string
  bytes_total: string
  msgs_total: string
  mboxes_in_domain: number
  mboxes_left: number
  domain_name: string
  domain_h_name: string
  description: string
  max_num_aliases_for_domain: number
  max_num_mboxes_for_domain: number
  def_quota_for_mbox: number
  max_quota_for_mbox: number
  max_quota_for_domain: number
  relayhost: string
  backupmx: 0 | 1
  backupmx_int: 0 | 1
  gal: 0 | 1
  gal_int: 0 | 1
  rl: {
    value: string
    frame: 'd' | 'h' | 'm'
  }
  active: 0 | 1
  active_int: 0 | 1
  relay_all_recipients: 0 | 1
  relay_all_recipients_int: 0 | 1
  relay_unknown_only: 0 | 1
  relay_unknown_only_int: 0 | 1
  created: string          // YYYY-MM-DD HH:mm:ss
  modified: string | null
  aliases_in_domain: number
  aliases_left: number
  domain_admins: string
}

export interface DomainSuggestion {
  ps: string 
  domain: string
  subdomain: string
  path: string
}

export interface DomainSearchResult {
  domain: string
  data: DomainSuggestion[]
}

export interface DomainAvailability {
  domain: string
  status: {
    clientIp: string
    status: 'avail' | 'taken'
  }
}