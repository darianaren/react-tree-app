import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { PAGES } from "./constants";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar component="header">
      <Toolbar>
        <Typography
          variant="h6"
          component="h1"
          sx={{
            flexGrow: 1,
            color: "#fff",
            cursor: "default",
            display: { xs: "none", sm: "block" }
          }}
        >
          REACT TREE APP
        </Typography>
        <Box component="nav" sx={{ display: { xs: "none", sm: "block" } }}>
          {PAGES.map(({ label, path }) => (
            <NavLink
              to={path}
              key={path}
              style={({ isActive }) => ({
                padding: "12px",
                textDecoration: "none",
                color: isActive ? "#ffaa00" : "#fff",
                fontWeight: isActive ? "bold" : "normal",
                transition: "color 0.3s ease, font-weight 0.3s ease"
              })}
            >
              {label}
            </NavLink>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
