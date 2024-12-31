import "./App.css";

import RouterConfig from "./routes";
import AlertProvider from "./providers/AlertProvider/AlertProvider";
import EditableTreeProvider from "./providers/EditableTreeProvider/EditableTreeProvider";

function App() {
  return (
    <AlertProvider>
      <EditableTreeProvider>
        <RouterConfig />
      </EditableTreeProvider>
    </AlertProvider>
  );
}

export default App;
