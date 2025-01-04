import { Switch } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";

import {
  TreeActionsParams,
  TreeProps
} from "../components/Tree/Tree.interfaces";
import useTree from "../hooks/useTree";
import Tree from "../components/Tree/Tree";
import { TreeNode } from "../providers/EditableTreeProvider/EditableTreeProvider.interfaces";

const meta: Meta<TreeProps> = {
  title: "Components/Tree",
  component: Tree,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "onChange" },
    isRoot: {
      control: {
        type: "boolean"
      },
      description: "Define si el nodo es el raíz del árbol"
    }
  }
};

export default meta;

const SAMPLE_DATA: TreeNode[] = [
  {
    id: "1",
    title: "Parent Node",
    children: [
      { id: "1.1", title: "Child Node 1", children: [] },
      { id: "1.2", title: "Child Node 2", children: [] }
    ]
  }
];

const Template: StoryFn<TreeProps> = (args) => {
  const { editableTree, expandAllTree, toggleEditable, toggleExpandAllTree } =
    useTree();

  return (
    <section>
      <label>Edit tree</label>
      <Switch
        checked={editableTree}
        onClick={toggleEditable}
        aria-label="Toggle editable tree"
      />

      <label>Expand all tree</label>
      <Switch
        checked={expandAllTree}
        onClick={toggleExpandAllTree}
        aria-label="Toggle expand tree"
      />
      <Tree {...args} />
    </section>
  );
};

export const Default: StoryFn<TreeProps> = Template.bind({});
Default.args = {
  id: "root",
  title: "Root Node",
  value: SAMPLE_DATA,
  isRoot: true,
  onChange: (typeAction: symbol, params: TreeActionsParams): void =>
    console.log("Tree Action:", { typeAction, params })
};
