import { createContext, useReducer, useEffect, type ReactNode } from "react";
import type { NewUserDto } from "../types";

// ── State & Action types ─────────────────────────────────────
interface AuthState {
  user: NewUserDto | null;
}

type AuthAction =
  | { type: "LOGIN"; payload: NewUserDto }
  | { type: "LOGOUT" }
  | { type: "UPDATE_BALANCE"; payload: number };

interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}

// ── Reducer ──────────────────────────────────────────────────
export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    case "UPDATE_BALANCE":
      if (!state.user) return state;
      return { user: { ...state.user, walletBalance: action.payload } };
    default:
      return state;
  }
};

// ── Context ──────────────────────────────────────────────────
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      const user: NewUserDto = JSON.parse(raw);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
