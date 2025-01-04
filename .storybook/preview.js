import AlertProvider from "../src/providers/AlertProvider/AlertProvider";
import EditableTreeProvider from "../src/providers/EditableTreeProvider/EditableTreeProvider";

/** @type { import('@storybook/react').Preview } */

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <AlertProvider>
        <EditableTreeProvider>
          <Story />
        </EditableTreeProvider>
      </AlertProvider>
    )
  ]
};

export default preview;
