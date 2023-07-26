import { createContext, useState, useMemo } from "react";
import { PropTypes } from "prop-types";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default UserContext;
