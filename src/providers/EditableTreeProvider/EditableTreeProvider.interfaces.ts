import { ReactNode } from "react";

export interface TreeNode {
  id: string;
  title: string;
  children?: TreeNode[];
}

export interface EditableTreeProviderProps {
  children: ReactNode;
}

export interface ToggleFunction {
  (): void;
}

export interface UpdateTreeFunction {
  (newTree: TreeNode): Promise<void>;
}

export interface EditableTreeContextType {
  tree: TreeNode;
  editableTree: boolean;
  expandAllTree: boolean;
  updateTree: UpdateTreeFunction;
  toggleEditable: ToggleFunction;
  toggleExpandAllTree: ToggleFunction;
}
