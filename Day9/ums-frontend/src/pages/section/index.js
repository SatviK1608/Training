import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UpdateContext } from "../../updateContext";

export default function Sections() {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const { sectionId, setSectionId } = useContext(UpdateContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/section/getSections")
      .then((res) => {
        setSections(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleViewSection = (section) => {
    setSectionId(section.id);
    navigate("/view-section");
  };

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      gap: 3,
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 3,
      maxWidth: 1200,
      mx: "auto",
    }}
     
    >
      {sections.map((section) => (
        <Card
          key={section.id}
          sx={{ minWidth: 275, maxWidth: 600, boxShadow: 4, borderRadius: 2, padding: 2, backgroundColor: "#f5f5f5" }}
        >
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {section.name}
            </Typography>
            <Divider sx={{ marginY: 2 }} />
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              startIcon={<Visibility />}
              variant="outlined"
              sx={{ color: "#616161", borderColor: "#bdbdbd", mr: 1 }}
              onClick={() => {
                handleViewSection(section);
              }}
            >
              VIEW SECTION
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
