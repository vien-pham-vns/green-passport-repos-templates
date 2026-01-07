'use client';

import MUIDrawer, { DrawerProps } from '@mui/material/Drawer';
import { CSSObject, Theme, styled } from '@mui/material/styles';

const opened = (theme: Theme): CSSObject => ({
  width: 'var(--sidebar-width)',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closed = (theme: Theme): CSSObject => ({
  width: 'var(--collapsed-sidebar-width)',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
});

export const Drawer: React.ComponentType<DrawerProps> = styled(MUIDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: 'var(--sidebar-width)',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  '& .MuiDrawer-paper': {
    zIndex: 1201,
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...opened(theme),
        '& .MuiDrawer-paper': {
          ...opened(theme),
          zIndex: 1201,
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closed(theme),
        '& .MuiDrawer-paper': {
          ...closed(theme),
          zIndex: 1201,
        },
      },
    },
  ],
}));
