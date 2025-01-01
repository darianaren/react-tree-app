import React, { useCallback, useEffect, useState } from "react";

import { Box } from "@mui/material";

import { ACTIONS } from "./constants";
import { RenderTreeProps, TreeProps } from "./Tree.interfaces";
import { AddForm, CollapseIcon, RenderEditableTree } from "./layout";

import useTree from "../../hooks/useTree";

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
  const { editableTree, expandAllTree } = useTree();

  const [isOpen, setIsOpen] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNodeTitle, setNewNodeTitle] = useState("");

  const toggleOpenTree = useCallback(() => setIsOpen((prev) => !prev), []);

  const openAddForm = useCallback(() => setShowAddForm(true), []);

  const setNodeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setNewNodeTitle(event.target.value),
    []
  );

  const handleAddNode = useCallback(() => {
    onChange(ACTIONS.ADD_NODE, { id, title: newNodeTitle });

    if (newNodeTitle.trim()) {
      setShowAddForm(false);
      setNewNodeTitle("");
    }
  }, [id, newNodeTitle, onChange]);

  const handleCancelAdd = useCallback(() => {
    setShowAddForm(false);
    setNewNodeTitle("");
  }, []);

  useEffect(() => {
    setIsOpen(expandAllTree);
  }, [expandAllTree]);

  return (
    <Box component="li" sx={{ listStyle: "none" }}>
      <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
        <CollapseIcon
          isOpen={isOpen}
          toggleOpen={toggleOpenTree}
          display={Boolean(value?.length)}
        />

        <RenderEditableTree
          id={id}
          title={title}
          isRoot={isRoot}
          onChange={onChange}
          isEditable={editableTree}
          openAddForm={openAddForm}
          isCollapsable={Boolean(value?.length)}
        />
      </Box>

      {isOpen || showAddForm ? (
        <Box
          component="section"
          sx={{
            marginLeft: "2rem",
            paddingLeft: "1rem",
            borderLeft: "1px #000 solid"
          }}
        >
          <AddForm
            display={showAddForm}
            newNodeTitle={newNodeTitle}
            handleAddNode={handleAddNode}
            setNewNodeTitle={setNodeTitle}
            handleCancelAdd={handleCancelAdd}
          />
          {isOpen && value?.length ? (
            <RenderTree data={value} onChange={onChange} />
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
};

export default Tree;
