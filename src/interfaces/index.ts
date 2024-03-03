export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContextType {
  isAuthenticated: boolean;
}

export interface IInitialRegistration {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IProducts {
  name: string;
  price: string;
  quantity: string;
  userId?: number;
}
export interface IGetUser extends IInitialRegistration {
  id: number;
}

export interface IGetProducts {
  id: number;
  name: string;
  price: string;
  quantity: string;
}
