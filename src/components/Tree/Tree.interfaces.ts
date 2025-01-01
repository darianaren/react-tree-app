import React from "react";

import { TreeNode } from "../../providers/EditableTreeProvider/EditableTreeProvider.interfaces";

export interface TreeActionsParams {
  id: string;
  title?: string;
}

export interface OnChangeFuntion {
  (typeAction: symbol, params: TreeActionsParams): void | Promise<void>;
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

export interface CollapseIconProps {
  display: boolean;
  isOpen: boolean;
  toggleOpen: () => void;
}

export interface RenderEditableTreeProps {
  id: string;
  title: string;
  isRoot?: boolean;
  isEditable: boolean;
  isCollapsable: boolean;
  openAddForm: () => void;
  onChange: OnChangeFuntion;
}

export interface AddFormProps {
  display: boolean;
  newNodeTitle: string;
  handleAddNode: () => void;
  handleCancelAdd: () => void;
  setNewNodeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
