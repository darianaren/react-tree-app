import { useEffect, useState } from "react";

import {
  AddNodeFunction,
  DeleteNodeFunction,
  EditableTreeProviderProps,
  EditNodeFunction,
  ToggleFunction,
  TreeNode
} from "./EditableTreeProvider.interfaces";
import { TREE_DEFAULT } from "./constants";

import { getItem } from "../../services/localStorage.service";
import { buildNodeMap } from "../../services/buildNodeMap.service";
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

  const syncTreeAndNodeMap = async (updatedTree: TreeNode) => {
    setTree(updatedTree);
    setNodeMap(buildNodeMap({ tree: [updatedTree] }));
    (await import("../../services/localStorage.service")).setItem(
      "tree",
      updatedTree
    );
  };

  const addNode: AddNodeFunction = async (parentId, titleNode) => {
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
      console.error(`Parent node with id ${parentId} not found.`);
    }
  };

  const editNode: EditNodeFunction = async (nodeId, updatedData) => {
    const nodeToEdit = nodeMap.get(nodeId);

    if (nodeToEdit) {
      Object.assign(nodeToEdit, updatedData);
      await syncTreeAndNodeMap(tree);
    } else {
      console.error(`Node with id ${nodeId} not found.`);
    }
  };

  const deleteNode: DeleteNodeFunction = async (nodeId) => {
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
      console.error(`Failed to delete node with id ${nodeId}.`);
    }
  };

  const toggleEditable: ToggleFunction = () => setEditableTree((prev) => !prev);

  const toggleExpandAllTree: ToggleFunction = () =>
    setExpandAllTree((prev) => !prev);

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
