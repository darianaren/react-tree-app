import { useEffect, useState } from "react";

import {
  EditableTreeProviderProps,
  ToggleFunction,
  TreeNode,
  UpdateTreeFunction
} from "./EditableTreeProvider.interfaces";
import { TREE_DEFAULT } from "./constants";

import { getItem } from "../../utils/localStorage";
import EditableTreeContext from "../../context/EditableTreeContext";

function EditableTreeProvider({ children }: EditableTreeProviderProps) {
  const [tree, setTree] = useState<TreeNode>(TREE_DEFAULT);
  const [editableTree, setEditableTree] = useState(false);
  const [expandAllTree, setExpandAllTree] = useState(false);

  const savedTree = getItem("tree", TREE_DEFAULT);

  useEffect(() => {
    if (savedTree?.expired || !savedTree?.value) {
      return setTree(TREE_DEFAULT);
    }
    return setTree(savedTree?.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTree: UpdateTreeFunction = async (newTree = TREE_DEFAULT) => {
    setTree(newTree);
    (await import("../../utils/localStorage")).setItem("tree", newTree);
  };

  const toggleEditable: ToggleFunction = () => setEditableTree((prev) => !prev);

  const toggleExpandAllTree: ToggleFunction = () =>
    setExpandAllTree((prev) => !prev);

  return (
    <EditableTreeContext.Provider
      value={{
        tree,
        expandAllTree,
        editableTree,
        updateTree,
        toggleEditable,
        toggleExpandAllTree
      }}
    >
      {children}
    </EditableTreeContext.Provider>
  );
}

export default EditableTreeProvider;
