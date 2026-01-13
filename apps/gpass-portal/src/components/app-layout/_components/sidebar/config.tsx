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
    link: '/portal',
    activePathnames: ['/portal'],
    group: 'group-pages',
  },

  {
    key: 'Dev tools',
    label: 'menu-dev-tools',
    icon: ({ isActive }) => <IconTools />,
    link: '/devtools',
    activePathnames: ['/devtools'],
    group: 'group-devtools',

    children: [
      {
        key: 'translation',
        label: 'translation',
        link: '/devtools',
        activePathnames: ['/devtools'],
      },
    ],
  },
];

export type { MenuItem as MenuItemConfig };
