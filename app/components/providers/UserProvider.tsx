import React, {createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {useSession} from "next-auth/react";
import {getUserById, GetUserByIdReturnType} from "@/utils/data/user";

type UserContextProps = {
  user: GetUserByIdReturnType | null;
  setUser: Dispatch<SetStateAction<GetUserByIdReturnType>>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {}
});

export function UserProvider({children}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<GetUserByIdReturnType | null>(null);
  const {data: session} = useSession();

  useEffect(() => {
    if (session) {
      getUserById(session.user.userId).then(u=>setUser(u));
    }
  }, [session]);
  
  const value = useMemo(() => ({ user, setUser }), [user]);
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Hook pratique pour récupérer les infos utilisateur
export function useUser() {
  return useContext(UserContext);
}