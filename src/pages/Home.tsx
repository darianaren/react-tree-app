import { SEVERITY_ALERT } from "../constants/severityAlert";
import useAlert from "../hooks/useAlert";

const Home = () => {
  const { showAlert } = useAlert();
  return (
    <div>
      <h1>Welcome to the Tree App</h1>
      <p>Navigate through the tree structure or view static content.</p>
      <button onClick={() => showAlert("¡Bienvenido!", SEVERITY_ALERT.success)}>
        Mostrar Alerta
      </button>
    </div>
  );
};

export default Home;
