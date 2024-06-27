import React from "react";
import { Box } from "@mui/material";
import Header from "./header";
import UserForm from "./userForm";
export default function Home() {
  return (
    <Box >
      <Header />
      <UserForm/>
    </Box>
  );
}
