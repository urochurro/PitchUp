import { createContext, useContext, useState } from "react";

const LoginContext = createContext(null);

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRecruiter, setIsRecruiter] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, isRecruiter, setIsRecruiter }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () =>  useContext(LoginContext);

export default LoginProvider;