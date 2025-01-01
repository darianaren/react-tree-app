import { Divider, Switch, Typography } from "@mui/material";

import Tree from "../components/Tree/Tree";
import useTree from "../hooks/useTree";
const Home = () => {
  const {
    tree,
    editableTree,
    expandAllTree,
    toggleEditable,
    toggleExpandAllTree
  } = useTree();

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

      <Tree isRoot id={tree.id} title={tree.title} value={tree.children} />
    </>
  );
};

export default Home;
