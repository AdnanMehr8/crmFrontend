import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
      <h1>CRM Home Page</h1>;
      <Link to="/customers">Go to Customer List Page</Link>
    </div>
  );
};

export default Home;
