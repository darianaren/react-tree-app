import { Divider, Switch, Typography } from "@mui/material";

import Tree from "../components/Tree/Tree";
import useTree from "../hooks/useTree";
const Home = () => {
  const { tree, toggleEditable, toggleExpandAllTree } = useTree();

  return (
    <>
      <Typography variant="h3" component="h1">
        Welcome to the Tree App
      </Typography>
      <p>Store and edit your data list.</p>

      <Divider component="hr" style={{ margin: "1rem 0" }} />

      <label>Edit tree</label>
      <Switch aria-label="Toggle editable tree" onClick={toggleEditable} />

      <label>Expand all tree</label>
      <Switch aria-label="Toggle expand tree" onClick={toggleExpandAllTree} />

      <Tree title={tree.title} value={tree.children} isRoot />
    </>
  );
};

export default Home;
