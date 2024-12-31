import React, { useState } from "react";

import { Add, Remove } from "@mui/icons-material";

import { RenderTreeProps, TreeProps } from "./Tree.interfaces";
import { Box, Button, IconButton, Typography } from "@mui/material";
import useTree from "../../hooks/useTree";

const RenderTree: React.FC<RenderTreeProps> = ({ data }) => {
  return (
    <ul>
      {data.map((node) => (
        <Tree key={node.id} title={node.title} value={node.children} />
      ))}
    </ul>
  );
};

const Tree: React.FC<TreeProps> = ({ title, value, onChange }) => {
  const { editableTree } = useTree();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const icon = isOpen ? <Remove /> : <Add />;
  return (
    <Box component="li" sx={{ listStyle: "none" }}>
      <Box component="div" sx={{ display: "flex" }}>
        {value?.length ? <Button onClick={toggleOpen}>{icon}</Button> : null}

        <Typography variant="h6" component="p">
          {title}
        </Typography>

        {editableTree ? (
          <IconButton aria-label="Add or delete node">
            <Add />
          </IconButton>
        ) : null}
      </Box>

      <Box
        component="section"
        sx={{
          marginLeft: "2rem",
          paddingLeft: "1rem",
          borderLeft: "1px #000 solid"
        }}
      >
        {isOpen && value?.length ? <RenderTree data={value} /> : null}
      </Box>
    </Box>
  );
};

export default Tree;
