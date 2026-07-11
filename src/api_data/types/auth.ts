export type AuthProvider = 'apple' | 'google' | 'email' | 'guest';

export type AuthOption = {
  provider: AuthProvider;
  label: string;
};

export type AuthContent = {
  title: string;
  hindiTitle: string;
  description: string;
  providers: AuthOption[];
  guestLabel: string;
};

export type AuthSession = {
  userId: string;
  token: string;
  provider: AuthProvider;
  isGuest: boolean;
};
