import React from "react";

export const getNavLinkStyle = ({
  isActive
}: {
  isActive: boolean;
}): React.CSSProperties => ({
  padding: "12px",
  textDecoration: "none",
  color: isActive ? "#ffaa00" : "#fff",
  fontWeight: isActive ? "bold" : "normal",
  transition: "color 0.3s ease, font-weight 0.3s ease"
});
