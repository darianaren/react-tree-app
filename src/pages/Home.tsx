import { Button, Divider, Typography } from "@mui/material";

import Tree from "../components/Tree/Tree";
import useTree from "../hooks/useTree";
const Home = () => {
  const { toggleEditable } = useTree();

  const prueba = {
    title: "raíz del árbol",
    children: [
      {
        id: "1",
        title: "hijo1",
        children: [
          {
            id: "2",
            title: "nieto1",
            children: []
          }
        ]
      },
      {
        id: "3",
        title: "hijo2",
        children: []
      }
    ]
  };

  return (
    <>
      <Typography variant="h3" component="h1">
        Welcome to the Tree App
      </Typography>
      <p>Store and edit your data list.</p>

      <Divider component="hr" style={{ margin: "1rem 0" }} />

      <Button variant="contained" onClick={toggleEditable}>
        Edit tree
      </Button>
      <Tree title={prueba.title} value={prueba.children} />
    </>
  );
};

export default Home;
