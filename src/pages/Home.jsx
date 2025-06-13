import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
     
      <h1>CRM Home Page</h1>
      <Link to="/customers">Go to Customer List Page</Link>
    </div>
  );
};

export default Home;
