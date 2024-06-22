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
        flexDirection: "column",
        gap: 3,
        flexWrap: "flex-wrap",
      }}
      marginTop={3}
      maxWidth={900}
    >
      {sections.map((section) => (
        <Card
          key={section.id}
          sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2, padding: 2 }}
        >
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {section.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              gutterBottom
            ></Typography>
            <Divider sx={{ marginY: 1 }} />
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              startIcon={<Visibility />}
              variant="outlined"
              onClick={() => {
                handleViewSection(section);
              }}
            >
              VIEW SECTION
            </Button>
            <Button
              startIcon={<Edit />}
              variant="outlined"
              color="primary"
              onClick={() => {}}
            >
              EDIT
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
