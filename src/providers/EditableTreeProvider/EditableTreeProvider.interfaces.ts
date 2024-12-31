import { ReactNode } from "react";

export interface EditableTreeProviderProps {
  children: ReactNode;
}

export interface ToggleEditableFunction {
  (): void;
}

export interface EditableTreeContextType {
  editableTree: boolean;
  toggleEditable: ToggleEditableFunction;
}
