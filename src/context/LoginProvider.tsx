import { createContext, useContext, useState } from "react";

const LoginContext = createContext(null);

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRecruiter, setIsRecruiter] = useState(false);
    const [userId, setUserId] = useState(null);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isRecruiter,
        setIsRecruiter,
        userId,
        setUserId,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () =>  useContext(LoginContext);

export default LoginProvider;