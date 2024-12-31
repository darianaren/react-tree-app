import { useContext } from "react";

import EditableTreeContext from "../context/EditableTreeContext";

function useTree() {
  const context = useContext(EditableTreeContext);

  if (!context) {
    throw new Error("useAlert must be used within a EditableTreeProvider");
  }

  return context;
}

export default useTree;
