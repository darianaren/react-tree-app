import {
  AddNodeFunction,
  DeleteNodeFunction,
  EditNodeFunction
} from "../../providers/EditableTreeProvider/EditableTreeProvider.interfaces";
import { ACTIONS } from "../../components/Tree/constants";
import { SEVERITY_ALERT } from "../../constants/severityAlert";
import { TreeActionsParams } from "../../components/Tree/Tree.interfaces";
import { ShowAlertFunction } from "../../providers/AlertProvider/AlertProvider.interfaces";

export const treeActions = ({
  addNode,
  editNode,
  showAlert,
  deleteNode
}: {
  addNode: AddNodeFunction;
  editNode: EditNodeFunction;
  showAlert: ShowAlertFunction;
  deleteNode: DeleteNodeFunction;
}) =>
  Object.freeze({
    [ACTIONS.ADD_NODE]: async ({ id, title }: TreeActionsParams) => {
      try {
        if (!title)
          return showAlert(
            "Please enter a valid title",
            SEVERITY_ALERT.warning
          );

        addNode(id, title);

        showAlert("New node added", SEVERITY_ALERT.success);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        showAlert(message, SEVERITY_ALERT.error);
      }
    },
    [ACTIONS.EDIT_NODE]: async ({ id, title }: TreeActionsParams) => {
      try {
        if (!title)
          return showAlert(
            "Please enter a valid title",
            SEVERITY_ALERT.warning
          );

        editNode(id, { title });
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        showAlert(message, SEVERITY_ALERT.error);
      }
    },
    [ACTIONS.DELETE_NODE]: async ({ id }: TreeActionsParams) => {
      try {
        deleteNode(id);
        showAlert("Node successfully removed", SEVERITY_ALERT.success);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        showAlert(message, SEVERITY_ALERT.error);
      }
    }
  });
