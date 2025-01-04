import { useContext } from "react";

import EditableTreeContext from "../context/EditableTreeContext";
import { EditableTreeContextType } from "../providers/EditableTreeProvider/EditableTreeProvider.interfaces";

/**
 * useTree Hook
 * A custom hook that provides access to the `EditableTreeContext` to manage and interact with a tree structure.
 * This hook retrieves the tree state and various functions to manipulate the tree, such as adding, editing, and deleting nodes.
 * It must be used within an `EditableTreeProvider` to access the context.
 *
 * @returns {EditableTreeContextType} The context value from `EditableTreeContext`.
 *    @returns {TreeNode} context.tree - The root node of the tree.
 *    @returns {boolean} context.editableTree - A flag indicating if the tree is editable.
 *    @returns {boolean} context.expandAllTree - A flag indicating if all tree nodes should be expanded.
 *    @returns {Map<string, TreeNode>} context.nodeMap - A map of node IDs to their respective nodes.
 *    @returns {AddNodeFunction} context.addNode - A function to add a node to the tree.
 *    @returns {EditNodeFunction} context.editNode - A function to edit a node in the tree.
 *    @returns {DeleteNodeFunction} context.deleteNode - A function to delete a node from the tree.
 *    @returns {ToggleFunction} context.toggleEditable - A function to toggle the tree's editability.
 *    @returns {ToggleFunction} context.toggleExpandAllTree - A function to toggle the expansion of all tree nodes.
 *
 * @throws {Error} Throws an error if the hook is used outside of an `EditableTreeProvider`.
 *
 * @example
 * ```js
 * const MyComponent = () => {
 *   const {
 *     tree,
 *     editableTree,
 *     expandAllTree,
 *     addNode,
 *     editNode,
 *     deleteNode,
 *     toggleEditable,
 *     toggleExpandAllTree
 *   } = useTree();
 *
 *   // Example usage of context functions
 *   const handleAddNode = () => {
 *     addNode({ id: 'new-node', title: 'New Node' });
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleAddNode}>Add Node</button>
 *     </div>
 *   );
 * };
 * ```
 */

function useTree(): EditableTreeContextType {
  const context = useContext(EditableTreeContext);

  if (!context) {
    throw new Error("useAlert must be used within a EditableTreeProvider");
  }

  return context;
}

export default useTree;
