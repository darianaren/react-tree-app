import React, { useEffect, useState } from "react";

import { Add, Remove } from "@mui/icons-material";

import { RenderTreeProps, TreeProps } from "./Tree.interfaces";
import { Box, Button, Icon, Input, Typography } from "@mui/material";
import useTree from "../../hooks/useTree";
import debounce from "../../services/debounce.service";

const RenderTree: React.FC<RenderTreeProps> = ({ data }) => {
  return (
    <ul>
      {data.map((node) => (
        <Tree
          id={node.id}
          key={node.id}
          title={node.title}
          value={node.children}
        />
      ))}
    </ul>
  );
};

const Tree: React.FC<TreeProps> = ({ id, title, value, isRoot }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { editableTree, expandAllTree, addNode, editNode, deleteNode } =
    useTree();

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

        {editableTree ? (
          <Input
            defaultValue={title}
            onChange={debounce({
              func: (e) => editNode(id, { title: e.target.value })
            })}
          />
        ) : (
          <Typography variant="h6" component="p">
            {title}
          </Typography>
        )}

        {editableTree ? (
          <div>
            <Button onClick={() => addNode(id, "Hola")}>
              <Icon
                color="primary"
                sx={{ cursor: "pointer" }}
                aria-label="Add or delete node"
              >
                post_add
              </Icon>
            </Button>
            {!isRoot ? (
              <Button onClick={() => deleteNode(id)}>
                <Icon
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  aria-label="Add or delete node"
                >
                  delete_outline
                </Icon>
              </Button>
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
