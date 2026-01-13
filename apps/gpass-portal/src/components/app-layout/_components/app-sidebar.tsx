'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Fragment, startTransition, useEffect, useState } from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { redirectToLogin } from '@/app/actions/auth';
import { useTranslations } from '@/providers/translation-provider/client';
import useSidebarStore from '@/store/use-sidebar-store';

import { sidebarItemConfig } from './sidebar/config';
import { LinkBehavior } from './sidebar/link-behavior';
import { Drawer } from './sidebar/styles';
import {
  findActiveMenuKey,
  findAutoExpandableKeys,
  groupMenuItems,
  isChildActive,
} from './sidebar/utils';

type HoverState = { key: string; top: number } | null;

// Application sidebar with role-based menu filtering and grouped navigation
export default function AppSidebar() {
  const t = useTranslations('app-layout');
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = useSidebarStore((state) => state.isOpen);

  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [hoveredMenu, setHoveredMenu] = useState<HoverState>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      handlePopoverClose();
      await redirectToLogin();
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  const handleProfile = () => {
    handlePopoverClose();
    startTransition(() => router.push('/profile'));
  };

  const isPopoverOpen = Boolean(anchorEl);

  const groupedItems = groupMenuItems(menuItems);

  return (
    <Drawer variant='permanent' open={isOpen} suppressHydrationWarning>
      <Box
        onClick={() => startTransition(() => router.push('/'))}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isOpen ? 'flex-start' : 'center',
          height: 'var(--header-height)',
          cursor: 'pointer',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          transition: (theme) =>
            theme.transitions.create(['padding', 'justify-content'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
        suppressHydrationWarning
      >
        {isOpen ? <>App Logo</> : <>Logo</>}
      </Box>

      <List sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 0 }}>
        {groupedItems.map(([groupName, items], index) => (
          <Fragment key={groupName ?? 'ungrouped'}>
            {/* Show group name */}
            {groupName && isOpen && (
              <ListItem sx={{ px: 2, mt: index > 0 ? 2 : 1 }} suppressHydrationWarning>
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
                <Fragment key={key}>
                  <ListItem
                    disablePadding
                    onMouseEnter={(e) => {
                      if (!isOpen && hasChildren) {
                        setHoveredMenu({
                          key,
                          top: e.currentTarget.getBoundingClientRect().top,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isOpen) setHoveredMenu(null);
                    }}
                    sx={{ position: 'relative' }}
                    suppressHydrationWarning
                  >
                    <Tooltip
                      title={t(label)}
                      placement='right'
                      arrow
                      disableHoverListener={isOpen || hasChildren}
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
                        component={hasChildren && isOpen ? 'div' : LinkBehavior}
                        {...(!(hasChildren && isOpen) && { href: link })}
                        sx={{ px: 2, py: 1.5 }}
                        selected={isActive && !hasChildren}
                        onClick={
                          hasChildren && isOpen
                            ? (e: React.MouseEvent) => {
                                e.preventDefault();
                                toggleExpanded(key);
                              }
                            : undefined
                        }
                        suppressHydrationWarning
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
                          sx={isOpen ? { marginLeft: -2 } : { marginLeft: 0 }}
                          suppressHydrationWarning
                        />
                        {hasChildren &&
                          isOpen &&
                          (isExpanded ? (
                            <ExpandMoreIcon sx={{ color: 'primary.light' }} />
                          ) : (
                            <ChevronRightIcon sx={{ color: 'action.selected' }} />
                          ))}
                      </ListItemButton>
                    </Tooltip>

                    {!isOpen && hasChildren && hoveredMenu?.key === key && (
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
                              component={LinkBehavior}
                              href={child.link}
                              selected={childIsActive}
                              sx={{ px: 2, py: 1.25, borderRadius: 0.5 }}
                              suppressHydrationWarning
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
                    <Collapse in={isExpanded && isOpen} timeout='auto' unmountOnExit>
                      <List component='div' disablePadding>
                        {children?.map((child) => {
                          const childIsActive = isChildActive(
                            pathname,
                            child.activePathnames
                          );
                          return (
                            <ListItem
                              key={child.key}
                              disablePadding
                              suppressHydrationWarning
                            >
                              <ListItemButton
                                component={LinkBehavior}
                                href={child.link}
                                sx={{ pl: 7, pr: 2, py: 1.25 }}
                                selected={childIsActive}
                                suppressHydrationWarning
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
                </Fragment>
              );
            })}
          </Fragment>
        ))}
      </List>

      <Box
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          p: '4px',
          display: 'flex',
          justifyContent: isOpen ? 'flex-start' : 'center',
        }}
        suppressHydrationWarning
      >
        <IconButton onClick={handleAvatarClick} disabled={isLoggingOut}>
          <Avatar sx={{ width: 32, height: 32 }} />
          <Typography sx={{ marginLeft: 1, fontSize: '14px' }} suppressHydrationWarning>
            {isOpen ? 'centralab@admin.com' : null}
          </Typography>
        </IconButton>

        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: isOpen ? 'center' : 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: isOpen ? 'center' : 'right',
          }}
          slotProps={{
            paper: {
              sx: {
                minWidth: 200,
                mt: -1,
              },
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant='body2' fontWeight={600}>
              centralab@admin.com
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              Administrator
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <PersonIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <LogoutIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Popover>
      </Box>
    </Drawer>
  );
}
