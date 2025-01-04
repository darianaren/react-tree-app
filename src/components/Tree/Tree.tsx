import React, { useCallback, useEffect, useState } from "react";

import { Box } from "@mui/material";

import { ACTIONS } from "./constants";
import { RenderTreeProps, TreeProps } from "./Tree.interfaces";
import { AddForm, CollapseIcon, RenderEditableTree } from "./layout";

import useTree from "../../hooks/useTree";

/**
 * RenderTree - A component that renders a tree of nodes.
 *
 * This component receives a list of nodes and renders them using the `Tree` component.
 *
 * @param {Object} props - Component props.
 *    @param {Array<TreeProps>} props.data - List of nodes to render.
 *    @param {Function} props.onChange - A function to handle changes to the nodes.
 *
 * @returns {JSX.Element} - The representation of the tree of nodes.
 */
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

/**
 * Tree Component
 * A component that represents a tree node, with options to collapse and expand.
 * This component allows adding nodes, collapsing or expanding nodes, and editing the node's title.
 *
 * @component
 * @param {Object} props - Component props.
 *    @param {string} props.id - The unique ID of the node.
 *    @param {string} props.title - The title of the node.
 *    @param {Array<TreeProps>} props.value - The child nodes of this node.
 *    @param {boolean} props.isRoot - Whether the node is the root of the tree.
 *    @param {Function} props.onChange - A function to handle changes to the nodes.
 *
 * @example
 * ```tsx
 * const CHILDREN = [
 *    {children: Array(2), title: 'Child 1', id: '1735767530815'},
 *    {children: Array(0), title: 'Child 2', id: '1735773523947'},
 *    {children: Array(0), title: 'Child 3', id: '1735773531837'}
 * ]
 *
 * <Tree
 *    isRoot
 *    id='my-tree-1'
 *    title='My tree'
 *    value={CHILDREN}
 *    onChange={onChange}
 * />
 * ```
 *
 * @returns {JSX.Element} - The representation of a node with edit and expand options.
 */
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
