import { createContext } from "react";
import { AlertContextType } from "../providers/AlertProvider/AlertProvider.interfaces";

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export default AlertContext;
