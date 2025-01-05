import React, { memo } from "react";
import { Add, Remove } from "@mui/icons-material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Button, IconButton, Input, Typography } from "@mui/material";

import { ACTIONS } from "./constants";
import {
  AddFormProps,
  CollapseIconProps,
  RenderEditableTreeProps
} from "./Tree.interfaces";

import debounce from "../../services/debounce.service";

/**
 * CollapseIcon - Component to display the collapse or expand icon for a tree.
 *
 * @param {boolean} display - Whether the icon should be displayed.
 * @param {boolean} isOpen - Whether the tree is expanded or collapsed.
 * @param {Function} toggleOpen - Function to toggle the expansion state.
 *
 * @returns {JSX.Element | null} - The corresponding icon if it should be shown.
 */
export const CollapseIcon: React.FC<CollapseIconProps> = memo(
  ({ display, isOpen, toggleOpen }) => {
    if (!display) return null;

    const icon = isOpen ? <Remove /> : <Add />;

    return <Button onClick={toggleOpen}>{icon}</Button>;
  }
);

CollapseIcon.displayName = "CollapseIcon";

/**
 * RenderEditableTree - Component to display and edit a tree node.
 *
 * @param {string} id - Unique ID of the node.
 * @param {string} title - Title of the node.
 * @param {boolean} isRoot - Whether the node is the root.
 * @param {boolean} isEditable - Whether the node is editable.
 * @param {boolean} isCollapsable - Whether the node is collapsible.
 * @param {Function} openAddForm - Function to show the form for adding a node.
 * @param {OnChangeFuntion} onChange - Function to handle changes to the node.
 *
 * @returns {JSX.Element} - The rendered node with editing options.
 */
export const RenderEditableTree: React.FC<RenderEditableTreeProps> = memo(
  ({ id, title, isRoot, onChange, isEditable, openAddForm, isCollapsable }) => {
    if (isEditable)
      return (
        <>
          <Input
            name="new-node"
            defaultValue={title}
            sx={{ marginLeft: isCollapsable ? 0 : "4.5rem" }}
            onChange={debounce({
              func: (e) =>
                onChange(ACTIONS.EDIT_NODE, { id, title: e.target.value })
            })}
          />
          <IconButton onClick={openAddForm} aria-label="Add node">
            <PostAddIcon
              color="primary"
              aria-label="Add node"
              sx={{ cursor: "pointer" }}
            />
          </IconButton>
          {!isRoot ? (
            <IconButton
              aria-label="Delete node"
              onClick={() => onChange(ACTIONS.DELETE_NODE, { id })}
            >
              <DeleteOutlineIcon
                color="primary"
                aria-label="Delete node"
                sx={{ cursor: "pointer" }}
              />
            </IconButton>
          ) : null}
        </>
      );

    return (
      <Typography
        variant="h6"
        component="p"
        sx={{ marginLeft: isCollapsable ? 0 : "4rem" }}
      >
        {title}
      </Typography>
    );
  }
);

RenderEditableTree.displayName = "RenderEditableTree";

/**
 * AddForm - Component to display a form for adding a new node.
 *
 * @param {boolean} display - Whether the form should be displayed.
 * @param {string} newNodeTitle - Title of the new node.
 * @param {Function} handleAddNode - Function to add the node.
 * @param {Function} handleCancelAdd - Function to cancel the action of adding a node.
 * @param {Function} setNewNodeTitle - Function to update the title of the new node.
 *
 * @returns {JSX.Element | null} - The form to add a new node.
 */
export const AddForm: React.FC<AddFormProps> = memo(
  ({
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
          required
          type="text"
          value={newNodeTitle}
          onChange={setNewNodeTitle}
          placeholder="Enter title for new node"
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
  }
);

AddForm.displayName = "AddForm";
