import React from "react";
import { Stack } from '@mui/material'
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/footer.jsx";

function Layout(props) {
  return (
            <Stack
            spacing="0"
            width="100%"
            alignItems="center"
            height="100vh"
            justifyContent="space-between"
        >
      <Navbar />
      {props.children}
      <Footer/>
        </Stack>
  );
}

export default Layout;
