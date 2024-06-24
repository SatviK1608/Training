import "./App.css";
import Button from "@mui/material/Button";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./pages/home";
import Users from "./pages/users";
import User from "./pages/profile/index";
import { UpdateContext } from "./updateContext";
import Sections from "./pages/section";
import ViewSection from "./pages/section/ViewSection";
import { useContext } from "react";
import Welcome from "./pages/welcome";

function App() {
  const navigate = useNavigate();
  const { update, setUpdate, setId } = useContext(UpdateContext);

  return (
    <div className="App">
      <h2>User Management System</h2>
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/");
            setUpdate(false);
            localStorage.clear();
          }}
        >
          HOME
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/all-users");
            localStorage.clear();
          }}
          style={{ marginLeft: "10px" }}
        >
          View Users
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setId(null);
            navigate("/home");
          }}
          style={{ marginLeft: "10px" }}
        >
          Add User
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/all-sections");
            setUpdate(false);
          }}
          style={{ marginLeft: "10px" }}
        >
          SECTIONS
        </Button>
      </Box>
      <Routes>
        <Route path="/" element={<Welcome />} />
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
