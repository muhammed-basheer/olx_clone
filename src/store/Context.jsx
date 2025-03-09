import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/config"; 

export const FirebaseContext = createContext(null);
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      // console.log("currentUser:", currentUser);
      setUser(currentUser); 
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
