import { Meta, StoryFn } from "@storybook/react";

import NavBar from "../components/NavBar/NavBar";
import { NavBarProps, Page } from "../components/NavBar/NavBar.interfaces";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<NavBarProps> = {
  title: "Components/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  argTypes: {
    pages: {
      control: {
        options: [
          { label: "Home", path: "/" },
          { label: "About", path: "/about" },
          { label: "Contact", path: "/contact" }
        ]
      }
    }
  }
};

export default meta;

const PAGES: Readonly<Page[]> = Object.freeze([
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" }
]);

const Template: StoryFn = (args) => (
  <BrowserRouter>
    <NavBar {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  pages: PAGES
};
