'use client';

import Image from 'next/image';

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
    icon: ({ isActive }) => (
      <Image
        src={
          isActive
            ? '/icons/sidebar/dashboard-active.svg'
            : '/icons/sidebar/dashboard.svg'
        }
        alt='portal-icon'
        width={32}
        height={32}
      />
    ),
    link: '/',
    activePathnames: ['/'],
    group: 'group-pages',
  },

  // {
  //   key: 'reports',
  //   label: 'menu-reports',
  //   icon: ({ isActive }) => (
  //     <Image
  //       src={isActive ? '/icons/sidebar/report-active.svg' : '/icons/sidebar/report.svg'}
  //       alt='report-icon'
  //       width={32}
  //       height={32}
  //     />
  //   ),
  //   link: routes.consumerFeedback.pathname,
  //   activePathnames: [routes.consumerFeedback.pathname],
  //   group: 'group-reports',
  //   children: [
  //     {
  //       key: 'report-feedbacks',
  //       label: 'consumer-feedback',
  //       link: routes.consumerFeedback.pathname,
  //       activePathnames: [routes.consumerFeedback.pathname],
  //     },
  //   ],
  // },
];

export type { MenuItem as MenuItemConfig };
