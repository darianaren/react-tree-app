import { TreeNode } from "../../providers/EditableTreeProvider/EditableTreeProvider.interfaces";

export interface TreeActionsParams {
  id: string;
  title?: string;
}

export interface OnChangeFuntion {
  (typeAction: symbol, params: TreeActionsParams): () => void | Promise<void>;
}

export interface RenderTreeProps {
  data: TreeNode[];
  onChange: OnChangeFuntion;
}

export interface TreeProps {
  id: string;
  title: string;
  isRoot?: boolean;
  value?: TreeNode[];
  onChange: OnChangeFuntion;
}
