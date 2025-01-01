import React, { useEffect, useState } from "react";

import { Add, Remove } from "@mui/icons-material";

import { RenderTreeProps, TreeProps } from "./Tree.interfaces";
import { Box, Button, Icon, Input, Typography } from "@mui/material";
import useTree from "../../hooks/useTree";
import debounce from "../../services/debounce.service";
import { ACTIONS } from "./constants";

const RenderTree: React.FC<RenderTreeProps> = ({ data, onChange }) => {
  return (
    <ul>
      {data.map((node) => (
        <Tree
          id={node.id}
          key={node.id}
          title={node.title}
          onChange={onChange}
          value={node.children}
        />
      ))}
    </ul>
  );
};

const Tree: React.FC<TreeProps> = ({ id, title, value, isRoot, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { editableTree, expandAllTree } = useTree();

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
            sx={{ marginLeft: value?.length ? 0 : "4.5rem" }}
            onChange={debounce({
              func: (e) =>
                onChange(ACTIONS.EDIT_NODE, { id, title: e.target.value })()
            })}
          />
        ) : (
          <Typography
            variant="h6"
            component="p"
            sx={{ marginLeft: value?.length ? 0 : "4.5rem" }}
          >
            {title}
          </Typography>
        )}

        {editableTree ? (
          <div>
            <Button onClick={onChange(ACTIONS.ADD_NODE, { id, title: "Hola" })}>
              <Icon
                color="primary"
                sx={{ cursor: "pointer" }}
                aria-label="Add or delete node"
              >
                post_add
              </Icon>
            </Button>
            {!isRoot ? (
              <Button onClick={onChange(ACTIONS.DELETE_NODE, { id })}>
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
        {isOpen && value?.length ? (
          <RenderTree data={value} onChange={onChange} />
        ) : null}
      </Box>
    </Box>
  );
};

export default Tree;
