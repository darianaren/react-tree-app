import React, { useEffect, useState } from "react";

import { Add, Remove } from "@mui/icons-material";

import { RenderTreeProps, TreeProps } from "./Tree.interfaces";
import { Box, Button, Icon, Typography } from "@mui/material";
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

const Tree: React.FC<TreeProps> = ({ title, value, onChange, isRoot }) => {
  const { editableTree, expandAllTree } = useTree();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const icon = isOpen ? <Remove /> : <Add />;

  useEffect(() => {
    setIsOpen(expandAllTree);
  }, [expandAllTree]);

  return (
    <Box component="li" sx={{ listStyle: "none" }}>
      <Box
        component="div"
        sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        {value?.length ? <Button onClick={toggleOpen}>{icon}</Button> : null}

        <Typography variant="h6" component="p">
          {title}
        </Typography>

        {editableTree ? (
          <div>
            <Icon
              color="primary"
              sx={{ cursor: "pointer" }}
              aria-label="Add or delete node"
            >
              post_add
            </Icon>
            {!isRoot ? (
              <Icon
                color="primary"
                sx={{ cursor: "pointer" }}
                aria-label="Add or delete node"
              >
                delete_outline
              </Icon>
            ) : null}
          </div>
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