import { createContext, ReactNode, useState, useEffect, useMemo, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as usersApi from "../api/users";
import * as sessionsApi from "../api/sessions";

export interface RegisterData {
  name: string,
  email: string,
  password: string,
}

export interface User {
  id: string,
  name: string,
  email: string,
}

export interface LoginData {
  email: string,
  password: string,
}

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (params: LoginData) => void;
  register: (params: RegisterData) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(undefined);
  }, [location.pathname]);

  useEffect(() => {
    usersApi.getCurrentUser(localStorage.getItem("token"))
      .then((user) => setUser(user))
      .catch((_) => console.log("No current active session"))
      .finally(() => setLoadingInitial(false));
  }, []);

  const login = (params: LoginData) => {
    setLoading(true);

    const { email, password } = params;

    sessionsApi.login({ email, password })
      .then(user => {
        setUser(user);
        navigate("/dashboard");
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }

  const register = (params: RegisterData) => {
    setLoading(true);

    usersApi.register(params)
      .then(userData => {
        setUser(userData.user);
        navigate("/dashboard");
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
};

const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth;