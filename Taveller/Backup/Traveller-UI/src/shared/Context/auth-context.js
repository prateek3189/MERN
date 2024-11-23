import { createContext } from "react";

export const AuthContext = createContext({
  isloggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});
