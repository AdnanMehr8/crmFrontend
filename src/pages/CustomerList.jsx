import { useState, useEffect } from "react";
import api from "../api/api";
import {
  Card,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchAllCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/customers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(response.data.customers);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ name: "", email: "", education: "" });
      fetchAllCustomers(); // Refresh list
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Customer List
      </Typography>

      <Card
        style={{
          padding: "20px",
          marginBottom: "30px",
          maxWidth: "600px",
          margin: "auto",
        }}>
        <Typography variant="h6" gutterBottom>
          Add New Customer
        </Typography>
        <form onSubmit={handleAddCustomer}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Education"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "10px" }}>
            Add Customer
          </Button>
        </form>
      </Card>

      <Card style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <Typography variant="h6" gutterBottom>
          Existing Customers
        </Typography>
        <List>
          {customers.map((customer) => (
            <ListItem key={customer._id} divider>
              <ListItemText
                primary={customer.name}
                secondary={customer.email}
              />
              <Button
                variant="outlined"
                style={{ marginLeft: "10px" }}
                onClick={() => navigate(`/customer/${customer._id}`)}>
                Details
              </Button>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default CustomerList;
