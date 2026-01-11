'use client';

import { IconTools, IconTransformPoint } from '@tabler/icons-react';

type MenuItem = {
  key: string;
  label: string;
  icon: React.FC<{ isActive: boolean }>;
  link: string;
  activePathnames: string[];
  group?: string;
  children?: {
    key: string;
    label: string;
    link: string;
    activePathnames: string[];
  }[];
};

export const sidebarItemConfig: MenuItem[] = [
  {
    key: 'portal',
    label: 'menu-portal',
    icon: ({ isActive }) => <IconTransformPoint />,
    link: '/',
    activePathnames: ['/'],
    group: 'group-pages',
  },

  {
    key: 'Dev tools',
    label: 'menu-dev-tools',
    icon: ({ isActive }) => <IconTools />,
    link: '/portal/devtools',
    activePathnames: ['/devtools'],
    group: 'group-devtools',
    children: [
      {
        key: 'translation',
        label: 'translation',
        link: '/portal/devtools',
        activePathnames: ['/devtools'],
      },
    ],
  },
];

export type { MenuItem as MenuItemConfig };
