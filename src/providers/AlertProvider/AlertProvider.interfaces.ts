import { ReactNode } from "react";

export interface AlertProviderProps {
  children: ReactNode;
}

export interface ShowAlertFunction {
  (message: string, severity: symbol): void;
}

export interface CloseFunction {
  (): void;
}

export interface AlertContextType {
  showAlert: ShowAlertFunction;
}
