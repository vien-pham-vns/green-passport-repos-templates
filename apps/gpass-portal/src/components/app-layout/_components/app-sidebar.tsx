'use client';
'use memo';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FC, startTransition, useEffect, useState } from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useTranslations } from '@/providers/translation-provider/client';

import { sidebarItemConfig } from './sidebar/config';
import { Drawer } from './sidebar/styles';
import type { AppSidebarProps } from './sidebar/type';
import {
  findActiveMenuKey,
  findAutoExpandableKeys,
  groupMenuItems,
  isChildActive,
} from './sidebar/utils';

type HoverState = { key: string; top: number } | null;

// Application sidebar with role-based menu filtering and grouped navigation
export const AppSidebar: FC<AppSidebarProps> = ({ open, onToggleOpenAction }) => {
  const t = useTranslations('app-layout');
  const router = useRouter();
  const pathname = usePathname();

  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [hoveredMenu, setHoveredMenu] = useState<HoverState>(null);

  const menuItems = sidebarItemConfig.filter(() => {
    return true;
  });

  const activeMenuKey = findActiveMenuKey(pathname, menuItems);

  useEffect(() => {
    const filteredMenuItems = sidebarItemConfig.filter(() => {
      return true;
    });

    const keysToExpand = findAutoExpandableKeys(pathname, filteredMenuItems);
    if (keysToExpand.length > 0) {
      // Use startTransition to avoid blocking render
      startTransition(() => {
        setExpandedKeys((prev) => {
          const next = new Set(prev);
          keysToExpand.forEach((key) => next.add(key));
          return next;
        });
      });
    }
  }, [pathname]);

  const toggleExpanded = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const groupedItems = groupMenuItems(menuItems);

  return (
    <Drawer variant='permanent' open={open}>
      <Box
        onClick={() => startTransition(() => router.push('/'))}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'flex-start' : 'center',
          height: 'var(--header-height)',
          cursor: 'pointer',
          borderBottom: '1px solid var(--neutral-200)',
          transition: (theme) =>
            theme.transitions.create(['padding', 'justify-content'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        {open ? <>App Logo</> : <>Logo</>}
      </Box>

      <List sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 0 }}>
        {groupedItems.map(([groupName, items], index) => (
          <div key={groupName ?? 'ungrouped'}>
            {groupName && open && (
              <ListItem sx={{ px: 2, mt: index > 0 ? 2 : 1 }}>
                <Typography
                  fontSize={13}
                  fontWeight={500}
                  color='text.secondary'
                  letterSpacing={0.5}
                >
                  {t(groupName)}
                </Typography>
              </ListItem>
            )}

            {items.map((item) => {
              const { label, icon: IconComponent, link, key, children } = item;
              const isActive = activeMenuKey === key;
              const isExpanded = expandedKeys.has(key);
              const hasChildren = Boolean(children?.length);

              return (
                <div key={key}>
                  <ListItem
                    disablePadding
                    onMouseEnter={(e) => {
                      if (!open && hasChildren) {
                        setHoveredMenu({
                          key,
                          top: e.currentTarget.getBoundingClientRect().top,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      if (!open) setHoveredMenu(null);
                    }}
                    sx={{ position: 'relative' }}
                  >
                    <Tooltip
                      title={t(label)}
                      placement='right'
                      arrow
                      disableHoverListener={open || hasChildren}
                      slotProps={{
                        popper: {
                          modifiers: [{ name: 'offset', options: { offset: [0, -8] } }],
                        },
                        tooltip: {
                          sx: {
                            bgcolor: 'brand.100',
                            color: 'primary.main',
                            '& .MuiTooltip-arrow': { color: 'brand.100' },
                          },
                        },
                      }}
                    >
                      <ListItemButton
                        sx={{ px: 2, py: 1.5 }}
                        selected={isActive && !hasChildren}
                        href={hasChildren ? '#' : link}
                        LinkComponent={hasChildren ? undefined : Link}
                        onClick={
                          hasChildren
                            ? () => {
                                if (open) toggleExpanded(key);
                              }
                            : undefined
                        }
                      >
                        <ListItemIcon>
                          <IconComponent isActive={isActive} key={`${isActive}`} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              fontSize={16}
                              fontWeight={500}
                              color={isActive ? 'primary' : 'neutral.600'}
                            >
                              {t(label)}
                            </Typography>
                          }
                          sx={open ? { marginLeft: -2 } : { marginLeft: 0 }}
                        />
                        {hasChildren &&
                          open &&
                          (isExpanded ? (
                            <ExpandMoreIcon sx={{ color: 'primary.light' }} />
                          ) : (
                            <ChevronRightIcon sx={{ color: 'action.selected' }} />
                          ))}
                      </ListItemButton>
                    </Tooltip>

                    {!open && hasChildren && hoveredMenu?.key === key && (
                      <Box
                        sx={{
                          position: 'fixed',
                          left: 'calc(var(--collapsed-sidebar-width) - 8px)',
                          top: `${hoveredMenu.top}px`,
                          minWidth: 200,
                          bgcolor: 'background.paper',
                          boxShadow:
                            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                          borderRadius: '4px',
                          p: 1,
                          zIndex: 1300,
                        }}
                      >
                        {children?.map((child) => {
                          const childIsActive = isChildActive(
                            pathname,
                            child.activePathnames
                          );
                          return (
                            <ListItemButton
                              key={child.key}
                              href={child.link}
                              selected={childIsActive}
                              sx={{ px: 2, py: 1.25, borderRadius: 0.5 }}
                            >
                              <Typography
                                fontSize={14}
                                fontWeight={childIsActive ? 500 : 400}
                                color={childIsActive ? 'primary' : 'neutral.600'}
                              >
                                {t(child.label)}
                              </Typography>
                            </ListItemButton>
                          );
                        })}
                      </Box>
                    )}
                  </ListItem>

                  {hasChildren && (
                    <Collapse in={isExpanded && open} timeout='auto' unmountOnExit>
                      <List component='div' disablePadding>
                        {children?.map((child) => {
                          const childIsActive = isChildActive(
                            pathname,
                            child.activePathnames
                          );
                          return (
                            <ListItem key={child.key} disablePadding>
                              <ListItemButton
                                sx={{ pl: 7, pr: 2, py: 1.25 }}
                                selected={childIsActive}
                                href={child.link}
                                LinkComponent={Link}
                              >
                                <ListItemText
                                  primary={
                                    <Typography
                                      fontSize={15}
                                      fontWeight={500}
                                      color={childIsActive ? 'primary' : 'neutral.600'}
                                    >
                                      {t(child.label)}
                                    </Typography>
                                  }
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </List>

      <Box
        sx={{
          borderTop: '1px solid var(--neutral-200)',
          p: '4px',
          display: 'flex',
          justifyContent: open ? 'flex-start' : 'center',
        }}
      >
        <IconButton onClick={onToggleOpenAction}>
          <Image
            src='/icons/sidebar/toggle-sidebar.svg'
            alt='toggle-sidebar'
            width={28}
            height={28}
          />
        </IconButton>
      </Box>
    </Drawer>
  );
};
