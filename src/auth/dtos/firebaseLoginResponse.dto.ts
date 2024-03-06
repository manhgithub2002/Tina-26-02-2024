export type LoginResponse = {
  access_token: string;

  user: any;
};

export type FireBaseLoginResponse = {
  idToken: string;
  refreshToken: string;
};
