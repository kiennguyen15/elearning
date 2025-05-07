import React, { createContext, useState, ReactNode, useEffect } from "react";

interface AppContextProps {
  userInfo: any;
  saveUserInfo: (userData: any) => void;
  isLogin: boolean;
  saveIsLogin: (flag: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  userInfo: null,
  saveUserInfo: () => {},
  isLogin: false,
  saveIsLogin: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<any>(() => {
    const saved = localStorage.getItem("userInfo");
    return saved ? JSON.parse(saved) : null;
  });

  const saveUserInfo = (userData: any) => {
    setUserInfo(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
  };

  const [isLogin, setIsLogin] = useState<boolean>(() => {
    const saved = localStorage.getItem("isLogin");
    return saved === "true";
  });

  const saveIsLogin = (flag: boolean) => {
    setIsLogin(flag);
    localStorage.setItem("isLogin", String(flag));
  };

  return (
    <AppContext.Provider
      value={{
        userInfo,
        saveUserInfo,
        isLogin,
        saveIsLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
