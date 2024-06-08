import React, { createContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface User {
  data: {
    id: string;
    email: string;
  } | null;
  error: string | null;
  loading: boolean;
}

const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([{ data: null, loading: true, error: null }, () => {}]);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const fetchUser = async () => {
        const { data: response } = await axios.get("http://localhost:8080/auth/me");
    
        if (response.data && response.data.user) {
          setUser({
            data: {
              id: response.data.user.id,
              email: response.data.user.email,
             
            },
            loading: false,
            error: null,
          });
        } else if (response.data && response.data.errors.length) {
          setUser({
            data: null,
            loading: false,
            error: response.errors[0].msg,
          });
        }
      };

    fetchUser();
  }, []); // Remove 'token' from the dependency array

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
