import { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "./api/utils/local-storage";

export const AuthContext = createContext<boolean>(false);

const AuthProvider: React.FC = ({ children }) => {
  const isValidToken = isAuthenticated();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (isValidToken !== authenticated) {
      setAuthenticated(isValidToken);
    }
  }, [authenticated, isValidToken]);

  return (
    <AuthContext.Provider value={authenticated}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
