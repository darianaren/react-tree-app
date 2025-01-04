import { fn } from "@storybook/test";
import { Switch } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";

import useTree from "../hooks/useTree";
import Tree from "../components/Tree/Tree";
import { TreeProps } from "../components/Tree/Tree.interfaces";
import { TreeNode } from "../providers/EditableTreeProvider/EditableTreeProvider.interfaces";

const meta: Meta<TreeProps> = {
  title: "Components/Tree",
  component: Tree,
  tags: ["autodocs"],
  args: {
    onChange: fn()
  },
  argTypes: {
    onChange: { action: "onChange" },
    isRoot: {
      control: {
        type: "boolean"
      },
      description: "Defines whether the node is the root of the tree"
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
  isRoot: true,
  title: "Root Node",
  value: SAMPLE_DATA
};
