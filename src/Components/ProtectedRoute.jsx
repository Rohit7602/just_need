import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("logIn") === "true";

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, []);
  return <div>{<Children />}</div>;
};

export default ProtectedRoute;
