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

  const syncTreeAndNodeMap = async (updatedTree: TreeNode) => {
    setTree(updatedTree);
    setNodeMap(buildNodeMap({ tree: [updatedTree] }));
    (await import("../../services/localStorage.service")).setItem(
      "tree",
      updatedTree
    );
  };

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

  const toggleEditable: ToggleFunction = useCallback(
    () => setEditableTree((prev) => !prev),
    []
  );

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
