import React from "react";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { getNavLinkStyle } from "./utils";
import { DEFAULT_PAGES } from "./constants";
import { NavBarProps } from "./NavBar.interfaces";

/**
 * NavBar Component
 *
 * A responsive navigation bar built with Material-UI that displays a title and navigation links.
 * The links can be customized by passing an array of pages as a prop.
 *
 * @component
 * @param {Object} props - Component props.
 *    @param {Readonly<Page[]>} [props.pages=DEFAULT_PAGES] - Array of page objects, where each object contains a label and a path for the navigation link.
 *
 * @example
 * ```tsx
 * const PAGES = Object.freeze([
 *   { label: "Home", path: "/" },
 *   { label: "About", path: "/about" },
 *   { label: "Contact", path: "/contact" },
 * ]);
 *
 * <NavBar pages={PAGES} />
 * ```
 *
 * @returns {JSX.Element} The rendered NavBar component.
 */

const NavBar: React.FC<NavBarProps> = ({ pages = DEFAULT_PAGES }) => {
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
        <Box component="nav" sx={{ display: { sm: "block" } }}>
          {pages.map(({ label, path }) => (
            <NavLink to={path} key={path} style={getNavLinkStyle}>
              {label}
            </NavLink>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
