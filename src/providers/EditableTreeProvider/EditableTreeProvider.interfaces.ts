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

export interface AddNodeFunction {
  (parentId: string, titleNode: string): Promise<void>;
}

export interface EditNodeFunction {
  (nodeId: string, updatedData: Partial<TreeNode>): Promise<void>;
}

export interface DeleteNodeFunction {
  (nodeId: string): Promise<void>;
}

export interface EditableTreeContextType {
  tree: TreeNode;
  editableTree: boolean;
  expandAllTree: boolean;
  nodeMap: Map<string, TreeNode>;
  addNode: AddNodeFunction;
  editNode: EditNodeFunction;
  deleteNode: DeleteNodeFunction;
  toggleEditable: ToggleFunction;
  toggleExpandAllTree: ToggleFunction;
}
