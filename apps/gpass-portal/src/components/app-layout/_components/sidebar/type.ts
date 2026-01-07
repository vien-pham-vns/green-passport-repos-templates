import type { MenuItemConfig } from './config';

export type { MenuItemConfig };

export type AppSidebarProps = {
  open: boolean;
  onToggleOpenAction: () => void;
};
