import { useState } from "react";

import {
  EditableTreeProviderProps,
  ToggleEditableFunction
} from "./EditableTreeProvider.interfaces";

import EditableTreeContext from "../../context/EditableTreeContext";

function EditableTreeProvider({ children }: EditableTreeProviderProps) {
  const [editableTree, setEditableTree] = useState(false);

  const toggleEditable: ToggleEditableFunction = () =>
    setEditableTree((prev) => !prev);

  return (
    <EditableTreeContext.Provider value={{ editableTree, toggleEditable }}>
      {children}
    </EditableTreeContext.Provider>
  );
}

export default EditableTreeProvider;
