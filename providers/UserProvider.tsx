"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface UserProviderProbs {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProbs> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
