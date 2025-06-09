import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  Card,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch single customer
  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/customer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(response.data.singleCustomer);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/customer/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Customer updated successfully");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    try {
      await api.delete(`/api/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Customer deleted");
      navigate("/customers"); // Go back to customer list
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Manage Customer
      </Typography>

      <form onSubmit={handleUpdate}>
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CustomerDetails;
