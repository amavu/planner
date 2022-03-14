import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Logout = ({ removeLoggedInUser }) => {
  const history = useHistory();

  useEffect(() => {
    removeLoggedInUser(undefined);
    localStorage.removeItem("plannertoken");
    history.replace("/");
  }, []);

  return <div>Logging out...</div>;
};
