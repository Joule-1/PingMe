import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userIdGlobal, setUserIdGlobal] = useState(null);

    return (
        <UserContext.Provider value={{ userIdGlobal, setUserIdGlobal }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
export { UserContext };
