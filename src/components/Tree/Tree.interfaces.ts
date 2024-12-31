import { TreeNode } from "../../providers/EditableTreeProvider/EditableTreeProvider.interfaces";

export interface RenderTreeProps {
  data: TreeNode[];
}

export interface TreeProps {
  title: string;
  isRoot?: boolean;
  value?: TreeNode[];
  editable?: boolean;
  onChange?: (newTree: TreeNode) => void;
}
