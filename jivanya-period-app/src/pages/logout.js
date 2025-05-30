import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.removeItem("isLoggedIn"); // clear login state
    } catch (e) {
      console.error("Failed to clear localStorage:", e);
    }
    navigate("/login", { replace: true }); // redirect to login page
  }, [navigate]);

  return null; // no UI needed since it redirects immediately
};

export default Logout;


