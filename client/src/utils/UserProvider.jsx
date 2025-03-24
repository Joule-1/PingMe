import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userid, setUserId] = useState(null);

    return (
        <UserContext.Provider value={{ userid, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
export { UserContext };
