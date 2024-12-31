import { Button, Divider } from "@mui/material";
import Tree from "../components/Tree/Tree";
const Home = () => {
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
    <div>
      <h2>Welcome to the Tree App</h2>
      <p>Store and edit your data list.</p>
      <Divider component="hr" style={{ margin: "1rem 0" }} />
      <Button variant="contained">Edit tree</Button>
      <Tree title={prueba.title} value={prueba.children} />
    </div>
  );
};

export default Home;
