export interface ILoginData {
  email: string;
  password: string;
  userType: number;
}

export interface ISignUp {
  email: string;
  username: string;
  password: string;
  userType?: number;
  companyCode?: string; //TODO: make it requried
  secretKey?: string;
}
