import "./App.css";
import Button from "@mui/material/Button";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./pages/home";
import Users from "./pages/users";
import User from "./pages/profile/index";
import { UpdateProvider, UpdateContext } from "./updateContext";
import { createContext, useContext, useState } from "react";
import Sections from "./pages/section";
import ViewSection from "./pages/section/ViewSection";
function App() {
  const navigate = useNavigate();
  const { update, setUpdate, setId } = useContext(UpdateContext);
  return (
    <div className="App">
      <h2>User Management Systems</h2>
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            setId(null);
            navigate("/home");
          }}
        >
          Add User
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/all-users");
            localStorage.clear();
          }}
          style={{ marginLeft: "5pt" }}
        >
          View Users
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/");
            setUpdate(false);
            localStorage.clear();
          }}
          style={{ marginLeft: "5pt" }}
        >
          HOME
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/all-sections");
            setUpdate(false);
          }}
          style={{ marginLeft: "5pt" }}
        >
          SECTIONS
        </Button>
      </Box>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/all-users" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/updateProfile" element={<Home />} />
        <Route path="/all-sections" element={<Sections />} />
        <Route path="/view-section" element={<ViewSection />} />
      </Routes>
    </div>
  );
}

export default App;
