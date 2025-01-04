export type Page = {
  label: string;
  path: string;
};

export interface NavBarProps {
  pages?: Readonly<Page[]>;
}
