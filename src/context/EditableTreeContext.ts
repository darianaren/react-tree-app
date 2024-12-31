import { createContext } from "react";

import { EditableTreeContextType } from "../providers/EditableTreeProvider/EditableTreeProvider.interfaces";

const EditableTreeContext = createContext<EditableTreeContextType | undefined>(
  undefined
);

export default EditableTreeContext;
