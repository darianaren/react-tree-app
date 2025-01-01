import React from "react";

import { Box, Button, Icon, Input, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

import { ACTIONS } from "./constants";
import {
  AddFormProps,
  CollapseIconProps,
  RenderEditableTreeProps
} from "./Tree.interfaces";

import debounce from "../../services/debounce.service";

export const CollapseIcon: React.FC<CollapseIconProps> = ({
  display,
  isOpen,
  toggleOpen
}) => {
  if (!display) return null;

  const icon = isOpen ? <Remove /> : <Add />;

  return <Button onClick={toggleOpen}>{icon}</Button>;
};

export const RenderEditableTree: React.FC<RenderEditableTreeProps> = ({
  id,
  title,
  isRoot,
  onChange,
  isEditable,
  openAddForm,
  isCollapsable
}) => {
  if (isEditable)
    return (
      <>
        <Input
          defaultValue={title}
          sx={{ marginLeft: isCollapsable ? 0 : "4.5rem" }}
          onChange={debounce({
            func: (e) =>
              onChange(ACTIONS.EDIT_NODE, { id, title: e.target.value })
          })}
        />
        <Button onClick={openAddForm}>
          <Icon
            color="primary"
            sx={{ cursor: "pointer" }}
            aria-label="Add or delete node"
          >
            post_add
          </Icon>
        </Button>
        {!isRoot ? (
          <Button onClick={() => onChange(ACTIONS.DELETE_NODE, { id })}>
            <Icon
              color="primary"
              sx={{ cursor: "pointer" }}
              aria-label="Add or delete node"
            >
              delete_outline
            </Icon>
          </Button>
        ) : null}
      </>
    );

  return (
    <Typography
      variant="h6"
      component="p"
      sx={{ marginLeft: isCollapsable ? 0 : "4.5rem" }}
    >
      {title}
    </Typography>
  );
};

export const AddForm: React.FC<AddFormProps> = ({
  display,
  newNodeTitle,
  handleAddNode,
  setNewNodeTitle,
  handleCancelAdd
}) => {
  if (!display) return null;

  return (
    <Box sx={{ marginLeft: "4rem", marginTop: "1rem" }}>
      <Input
        type="text"
        value={newNodeTitle}
        onChange={setNewNodeTitle}
        placeholder="Enter title for new node"
        fullWidth
      />
      <Box sx={{ marginTop: "0.5rem" }}>
        <Button onClick={handleAddNode} variant="contained" color="primary">
          Add
        </Button>
        <Button
          onClick={handleCancelAdd}
          variant="outlined"
          color="secondary"
          sx={{ marginLeft: "0.5rem" }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
