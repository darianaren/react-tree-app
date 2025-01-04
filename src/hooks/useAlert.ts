import { useContext } from "react";

import AlertContext from "../context/AlertContext";
import { AlertContextType } from "../providers/AlertProvider/AlertProvider.interfaces";

/**
 * useAlert Hook
 * A custom hook that provides access to the `AlertContext` to show alerts within a component.
 * This hook retrieves the `AlertContext` and returns the function to display alerts, which must be used inside the `AlertProvider`.
 *
 * @returns {AlertContextType} The context value from `AlertContext`.
 *    @returns {Function} showAlert - A function that takes a message (string) and severity (symbol) to show an alert.
 *
 * @throws {Error} - Throws an error if the hook is used outside of an `AlertProvider`.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const showAlert = useAlert();
 *
 *   const handleClick = () => {
 *     showAlert('This is an alert message', 'info');
 *   };
 *
 *   return <button onClick={handleClick}>Show Alert</button>;
 * };
 * ```
 *
 * @returns {void} - The function does not return any value.
 */

function useAlert(): AlertContextType {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within a AlertProvider");
  }

  return context;
}

export default useAlert;
