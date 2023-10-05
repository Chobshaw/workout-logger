import { createContext, useEffect, useReducer } from "react";

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  token: string;
};

interface AuthState {
  user: User;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload: any;
}

export const AuthContext = createContext<{
  user: User | null;
  dispatch: React.Dispatch<any>;
}>({ user: null, dispatch: () => null });

export function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

export function AuthContextProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
