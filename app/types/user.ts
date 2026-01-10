export type User = {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    confirmed_at: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
    is_anonymous: boolean;
  };
};
