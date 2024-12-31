import "./App.css";

import RouterConfig from "./routes";
import AlertProvider from "./providers/AlertProvider/AlertProvider";

function App() {
  return (
    <AlertProvider>
      <RouterConfig />
    </AlertProvider>
  );
}

export default App;
