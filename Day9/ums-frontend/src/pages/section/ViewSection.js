import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UpdateContext } from "../../updateContext";
import { Box, Button, Card, CardContent, CardActions, Typography, Divider } from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";

export default function ViewSection() {
  const { sectionId } = useContext(UpdateContext);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .put("http://localhost:5000/section/viewSectionUsers", { id: sectionId })
      .then((res) => {
        setInfo(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [sectionId]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 3,flexWrap: "wrap",justifyContent: "center",alignItems: "center", alignItems: "center", marginTop: 3 }}>
      {info.map((user) => (
        <Card key={user.id} sx={{ minWidth: 275, maxWidth: 600, boxShadow: 4, borderRadius: 2, margin: 2, padding: 2, backgroundColor: "#f5f5f5" }}>
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
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button startIcon={<Visibility />} variant="outlined" sx={{ color: "#616161", borderColor: "#bdbdbd", mr: 1 }}>
              View
            </Button>
            <Button startIcon={<Edit />} variant="outlined" sx={{ color: "#616161", borderColor: "#bdbdbd", mr: 1 }}>
              Edit
            </Button>
            <Button startIcon={<Delete />} variant="outlined" sx={{ color: "#616161", borderColor: "#bdbdbd" }}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
      {info.length === 0 && (
        <Card sx={{ minWidth: 275, maxWidth: 600, boxShadow: 4, borderRadius: 2, margin: 2, padding: 2, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              No Users
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
