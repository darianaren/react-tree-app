import { useCallback, useState } from "react";

import { Snackbar, Alert } from "@mui/material";

import {
  SEVERITY_ALERT,
  SEVERITY_ALERT_VALUE
} from "../../constants/severityAlert";
import AlertContext from "../../context/AlertContext";

import {
  AlertProviderProps,
  CloseFunction,
  ShowAlertFunction
} from "./AlertProvider.interfaces";

function AlertProvider({ children }: AlertProviderProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState(SEVERITY_ALERT.info);

  /**
   * Displays an alert with the provided message and severity.
   *
   * @function
   * @name showAlert
   * @param {string} message - The message to display in the alert.
   * @param {symbol} severity - The severity level of the alert.
   */
  const showAlert: ShowAlertFunction = useCallback((message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }, []);

  /**
   * Stop displaying the message
   *
   * @function
   * @name handleClose
   */
  const handleClose: CloseFunction = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          sx={{ width: "100%" }}
          severity={
            SEVERITY_ALERT_VALUE[severity] as
              | "info"
              | "error"
              | "warning"
              | "success"
          }
        >
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

export default AlertProvider;
