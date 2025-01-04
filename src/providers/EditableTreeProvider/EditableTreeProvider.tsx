import { useCallback, useEffect, useState } from "react";

import {
  AddNodeFunction,
  DeleteNodeFunction,
  EditableTreeProviderProps,
  EditNodeFunction,
  ToggleFunction,
  TreeNode
} from "./EditableTreeProvider.interfaces";
import { buildNodeMap } from "./utils";
import { TREE_DEFAULT } from "./constants";

import { getItem } from "../../services/localStorage.service";
import EditableTreeContext from "../../context/EditableTreeContext";

function EditableTreeProvider({ children }: EditableTreeProviderProps) {
  const [tree, setTree] = useState<TreeNode>(TREE_DEFAULT);
  const [editableTree, setEditableTree] = useState(false);
  const [expandAllTree, setExpandAllTree] = useState(true);
  const [nodeMap, setNodeMap] = useState<Map<string, TreeNode>>(
    buildNodeMap({ tree: [TREE_DEFAULT] })
  );

  useEffect(() => {
    const savedTree = getItem("tree", TREE_DEFAULT);

    if (savedTree?.expired || !savedTree?.value) {
      setTree(TREE_DEFAULT);
      setNodeMap(buildNodeMap({ tree: [TREE_DEFAULT] }));
    } else {
      setTree(savedTree.value);
      setNodeMap(buildNodeMap({ tree: [savedTree.value] }));
    }
  }, []);

  /**
   * Synchronizes the tree and node map with the updated tree structure.
   * This function updates the state of the tree, the node map, and saves the updated tree to local storage.
   *
   * @param {TreeNode} updatedTree - The updated tree to be synced.
   * @returns {Promise<void>} A promise that resolves once the synchronization is complete.
   */
  const syncTreeAndNodeMap = async (updatedTree: TreeNode): Promise<void> => {
    setTree(updatedTree);
    setNodeMap(buildNodeMap({ tree: [updatedTree] }));
    (await import("../../services/localStorage.service")).setItem(
      "tree",
      updatedTree
    );
  };

  /**
   * Adds a new node to the tree under a specified parent node.
   * This function creates a new node and appends it as a child to the parent node.
   * The updated tree is then synced with the state and local storage.
   *
   * @param {string} parentId - The ID of the parent node to which the new node should be added.
   * @param {string} titleNode - The title of the new node to be added.
   * @returns {Promise<void>} A promise that resolves once the node is added and the tree is synchronized.
   *
   * @throws {Error} Throws an error if the parent node is not found.
   */
  const addNode: AddNodeFunction = useCallback(
    async (parentId, titleNode) => {
      const newNode: TreeNode = {
        children: [],
        title: titleNode,
        id: Date.now().toString()
      };

      const parentNode = nodeMap.get(parentId);

      if (parentNode) {
        parentNode.children = parentNode.children || [];
        parentNode.children.push(newNode);

        await syncTreeAndNodeMap(tree);
      } else {
        throw new Error(`Parent node with id ${parentId} not found.`);
      }
    },
    [nodeMap, tree]
  );

  /**
   * Edits an existing node in the tree with the provided updated data.
   * This function updates the node's properties and then syncs the updated tree with the state and local storage.
   *
   * @param {string} nodeId - The ID of the node to be edited.
   * @param {object} updatedData - The new data to update the node with.
   * @returns {Promise<void>} A promise that resolves once the node is updated and the tree is synchronized.
   *
   * @throws {Error} Throws an error if the node to be edited is not found.
   */
  const editNode: EditNodeFunction = useCallback(
    async (nodeId, updatedData) => {
      const nodeToEdit = nodeMap.get(nodeId);

      if (nodeToEdit) {
        Object.assign(nodeToEdit, updatedData);
        await syncTreeAndNodeMap(tree);
      } else {
        throw new Error(`Node with id ${nodeId} not found.`);
      }
    },
    [nodeMap, tree]
  );

  /**
   * Deletes a node from the tree based on the provided node ID.
   * This function recursively searches for the node and removes it, then syncs the updated tree with the state and local storage.
   *
   * @param {string} nodeId - The ID of the node to be deleted.
   * @returns {Promise<void>} A promise that resolves once the node is deleted and the tree is synchronized.
   *
   * @throws {Error} Throws an error if the node cannot be deleted or if the node is not found.
   */
  const deleteNode: DeleteNodeFunction = useCallback(
    async (nodeId) => {
      const removeNode = (currentNode: TreeNode): TreeNode | null => {
        if (currentNode.id === nodeId) return null;

        currentNode.children = currentNode.children
          ?.map(removeNode)
          .filter((child) => child !== null) as TreeNode[];

        return currentNode;
      };

      const updatedTree = removeNode(tree);
      if (updatedTree) {
        await syncTreeAndNodeMap(updatedTree);
      } else {
        throw new Error(`Failed to delete node with id ${nodeId}.`);
      }
    },
    [tree]
  );

  /**
   * Toggles the editable state of the tree.
   * This function toggles whether the tree is in an editable state or not.
   *
   * @returns {void}
   */
  const toggleEditable: ToggleFunction = useCallback(
    () => setEditableTree((prev) => !prev),
    []
  );

  /**
   * Toggles the expand/collapse state of all tree nodes.
   * This function toggles whether all tree nodes should be expanded or collapsed.
   *
   * @returns {void}
   */
  const toggleExpandAllTree: ToggleFunction = useCallback(
    () => setExpandAllTree((prev) => !prev),
    []
  );

  return (
    <EditableTreeContext.Provider
      value={{
        tree,
        nodeMap,
        expandAllTree,
        editableTree,
        addNode,
        editNode,
        deleteNode,
        toggleEditable,
        toggleExpandAllTree
      }}
    >
      {children}
    </EditableTreeContext.Provider>
  );
}

export default EditableTreeProvider;
