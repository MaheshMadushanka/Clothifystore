import { useNavigate } from "react-router-dom";
import "./logout.css"

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("authToken");

    // Redirect to sign-in page
    navigate("/signin");
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Logout;
