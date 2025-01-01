import { TreeNode } from "./EditableTreeProvider.interfaces";

export const buildNodeMap = ({
  tree,
  nodeMap = new Map()
}: {
  tree: TreeNode[];
  nodeMap?: Map<string, TreeNode>;
}): Map<string, TreeNode> => {
  for (const node of tree) {
    nodeMap.set(node.id, node);

    if (node.children) {
      buildNodeMap({ tree: node.children, nodeMap });
    }
  }
  return nodeMap;
};
