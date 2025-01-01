import { TreeNode } from "./EditableTreeProvider.interfaces";

export const TREE_DEFAULT: TreeNode = {
  id: Date.now().toString(),
  children: [],
  title: "Root of the Tree"
};
