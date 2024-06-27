import React, { useEffect, useState, useContext } from "react";
import { UpdateContext } from "../../updateContext";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";

const currentUser = JSON.parse(localStorage.getItem("user")) || { id: 1 };

const UserInfo = () => {
  const [user, setUser] = useState({
    addresses: [],
    qualifications: [],
  });
  // const { id } = useContext(UpdateContext);
  const { id} = useContext(UpdateContext);

  useEffect(() => {
    if (id) {
      axios
        .post("http://localhost:5000/user/getProfile", { id: id })
        .then((res) => {
          const data = res.data.data;
          const qualifications = data.qualification;
          const section = data.section;
          setUser({
            ...data.result,
            qualifications: qualifications,
            section: section,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 3,
        width: "100%",
      }}
    >
      <Card
        sx={{
          minWidth: 600,
          maxWidth: 800,
          boxShadow: 4,
          borderRadius: 2,
          padding: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {user.email}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>ID:</strong> {user.id}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: 2 }}
            >
              <strong>Addresses:</strong>
              <Box component="ul" sx={{ paddingLeft: 2, margin: 0 }}>
                {user.addresses.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </Box>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: 2 }}
            >
              <strong>Payment Method:</strong>
              <p> {user && user.paymentMethods && user.paymentMethods[0]}</p>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: 2 }}
            >
              <strong>Section:</strong> {user.section}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: 2 }}
            >
              <strong>Qualifications:</strong>
              <Box component="ul" sx={{ paddingLeft: 2, margin: 0 }}>
                {user.qualifications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </Box>
            </Typography>
          </Box>
          {user.profileImage && (
            <Box
              component="img"
              src={user.profileImage}
              alt={`${user.name}'s profile`}
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                marginTop: 2,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserInfo;

