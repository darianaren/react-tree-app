import { useCallback } from "react";

import { Divider, Switch, Typography } from "@mui/material";

import { treeActions } from "./utils";

import useTree from "../../hooks/useTree";
import useAlert from "../../hooks/useAlert";
import Tree from "../../components/Tree/Tree";
import { OnChangeFuntion } from "../../components/Tree/Tree.interfaces";

const Home = () => {
  const {
    tree,
    editableTree,
    expandAllTree,
    toggleEditable,
    toggleExpandAllTree,
    addNode,
    editNode,
    deleteNode
  } = useTree();
  const { showAlert } = useAlert();

  const onChange: OnChangeFuntion = useCallback(
    async (typeAction, params) => {
      const objectActions = treeActions({
        addNode,
        editNode,
        deleteNode,
        showAlert
      });

      const action = objectActions[typeAction];

      await action(params);
    },
    [addNode, deleteNode, editNode, showAlert]
  );

  return (
    <>
      <Typography variant="h3" component="h1">
        Welcome to the Tree App
      </Typography>
      <p>Store and edit your data list.</p>

      <Divider component="hr" style={{ margin: "1rem 0" }} />

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

      <ul>
        <Tree
          isRoot
          id={tree.id}
          title={tree.title}
          onChange={onChange}
          value={tree.children}
        />
      </ul>
    </>
  );
};

export default Home;
