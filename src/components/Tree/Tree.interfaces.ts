interface TreeNode {
  id: string;
  title: string;
  children?: TreeNode[];
}

export interface RenderTreeProps {
  data: TreeNode[];
}

export interface TreeProps {
  title: string;
  value?: TreeNode[];
  editable?: boolean;
  onChange?: (newTree: TreeNode) => void;
}
