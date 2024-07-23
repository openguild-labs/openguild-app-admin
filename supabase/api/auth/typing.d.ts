type TSignInRequest = {
  email: string;
  password: string;
};

type TSignInResponse = {
  user: TUserSignInResponse;
  session: TSessionSignInResponse;
};

type TUserSignInResponse = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
};

type TSessionSignInResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
};
