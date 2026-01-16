export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  roleLabel?: {
    en: string;
    th: string;
  };
  profile: {
    nickname?: string;
  };
}
