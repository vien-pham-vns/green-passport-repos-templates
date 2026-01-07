import type { MenuItemConfig } from './type';

// Checks if pathname matches activePath (exact, dynamic routes like [id], or nested paths)
export const matchesPath = (pathname: string, activePath: string): boolean => {
  if (pathname === activePath) return true;

  if (activePath.includes('[')) {
    const pattern = activePath.replace(/\[.*?\]/g, '[^/]+');
    return new RegExp(`^${pattern}$`).test(pathname);
  }

  return pathname.startsWith(activePath + '/');
};

// Checks if menu item is active (parent or any child matches pathname)
export const isMenuItemActive = (pathname: string, item: MenuItemConfig): boolean => {
  const isParentActive = item.activePathnames.some((path) => matchesPath(pathname, path));
  if (isParentActive) return true;

  if (item.children) {
    return item.children.some((child) =>
      child.activePathnames.some((path) => matchesPath(pathname, path))
    );
  }

  return false;
};

// Checks if a child menu item is active based on its active pathnames
export const isChildActive = (
  pathname: string,
  childActivePathnames: string[]
): boolean => {
  return childActivePathnames.some((path) => matchesPath(pathname, path));
};

// Groups menu items by their group property, returns [groupName | null, items[]][]
export const groupMenuItems = (items: MenuItemConfig[]) => {
  const grouped = new Map<string | null, MenuItemConfig[]>();

  items.forEach((item) => {
    const key = item.group ?? null;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(item);
  });

  return Array.from(grouped.entries());
};

// Finds the key of the currently active menu item
export const findActiveMenuKey = (
  pathname: string,
  menuItems: MenuItemConfig[]
): string | undefined => {
  return menuItems.find((item) => isMenuItemActive(pathname, item))?.key;
};

// Finds parent menu items that should be auto-expanded based on active children
export const findAutoExpandableKeys = (
  pathname: string,
  menuItems: MenuItemConfig[]
): string[] => {
  return menuItems
    .filter((item) => {
      if (!item.children) return false;
      return item.children.some((child) =>
        child.activePathnames.some((path) => matchesPath(pathname, path))
      );
    })
    .map((item) => item.key);
};
