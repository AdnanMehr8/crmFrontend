import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CustomerList from "./pages/CustomerList";
import Home from "./pages/Home";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import CustomerDetails from "./pages/CustomerDetailsPage";


const Unauthorized = () => <h1>Unauthorized Access</h1>;

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin";
};

const AdminRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/unauthorized" />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AdminRoute>
                <Home />
              </AdminRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <AdminRoute>
                <CustomerList />
              </AdminRoute>
            }
          />
          <Route
            path="/customer/:id"
            element={
              <AdminRoute>
                <CustomerDetails />
              </AdminRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/customers" element={<CustomerList />} /> */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to="/" />} />{" "}
        </Routes>
      </Router>
    </>
  );
}

export default App;
