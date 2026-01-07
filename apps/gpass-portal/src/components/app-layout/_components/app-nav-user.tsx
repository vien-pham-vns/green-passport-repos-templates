// 'use client';

// import { useRouter } from 'next/navigation';
// import { MouseEvent, startTransition, useState } from 'react';

// import HeadphonesOutlined from '@mui/icons-material/HeadphonesOutlined';
// import Logout from '@mui/icons-material/Logout';
// import Settings from '@mui/icons-material/Settings';
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import Chip from '@mui/material/Chip';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Typography from '@mui/material/Typography';
// import { routes } from 'routes';

// // import { logout } from 'services/auth';

// import { useTranslations } from '@/providers/translation-provider/client';
// import useUserStore from '@/store/use-user-store';

// export const AppNavUser = () => {
//   const router = useRouter();
//   const t = useTranslations('common');

//   const user = useUserStore((state) => state.user);

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const avatarUrl = user?.avatar?.filenameDisk
//     ? getAssetUrl(user.avatar.filenameDisk)
//     : '';

//   const handleClick = (event: MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = async () => {
//     await logout();
//   };

//   return (
//     <>
//       <IconButton
//         onClick={handleClick}
//         size='small'
//         aria-controls={open ? 'account-menu' : undefined}
//         aria-haspopup='true'
//         aria-expanded={open ? 'true' : undefined}
//       >
//         <Box
//           sx={{
//             border: (theme) => `3px solid ${theme.palette.primary.main}`,
//             borderRadius: 5,
//           }}
//         >
//           <Avatar
//             src={avatarUrl}
//             sx={{ width: 32, height: 32, border: '2px solid white' }}
//           />
//         </Box>
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         id='account-menu'
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         slotProps={{
//           paper: {
//             elevation: 0,
//             sx: {
//               minWidth: '250px',
//               overflow: 'visible',
//               filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//               mt: 1.5,
//               '&::before': {
//                 content: '""',
//                 display: 'block',
//                 position: 'absolute',
//                 top: 0,
//                 right: 14,
//                 width: 10,
//                 height: 10,
//                 bgcolor: 'background.paper',
//                 transform: 'translateY(-50%) rotate(45deg)',
//                 zIndex: 0,
//               },
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <MenuItem sx={{ '&:hover': { background: 'transparent', cursor: 'auto' } }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Box
//               sx={{
//                 border: (theme) => `3px solid ${theme.palette.primary.main}`,
//                 borderRadius: 5,
//               }}
//             >
//               <Avatar
//                 src={avatarUrl}
//                 sx={{ width: 40, height: 40, border: '2px solid white' }}
//               >
//               </Avatar>
//             </Box>
//             <Box sx={{ flex: 1 }}>
//               <Typography fontWeight={500}>
//                 {[user?.firstName, user?.lastName]
//                   .filter((v) => !!v)
//                   .join(' ')
//                   .trim() || '--'}
//               </Typography>
//               <Typography variant='body2' color='#555'>
//                 {user?.email || '--'}
//               </Typography>
//               <Chip
//                 size='small'
//                 color='secondary'
//                 label={t(`user-role-${user?.profile?.role}`) || '--'}
//                 sx={{ px: 1, mt: '4px', height: '20px' }}
//               />
//             </Box>
//           </Box>
//         </MenuItem>
//         <Divider />
//         <MenuItem
//           onClick={() => {
//             router.push(routes.profile.pathname);
//           }}
//         >
//           <ListItemIcon>
//             <Settings fontSize='small' />
//           </ListItemIcon>
//           {t('profile-settings')}
//         </MenuItem>
//         <MenuItem
//           onClick={() =>
//             startTransition(() => {
//               router.push('/contact-us');
//             })
//           }
//         >
//           <ListItemIcon>
//             <HeadphonesOutlined fontSize='small' />
//           </ListItemIcon>
//           {t('contact-us')}
//         </MenuItem>
//         <MenuItem onClick={handleLogout}>
//           <ListItemIcon>
//             <Logout fontSize='small' />
//           </ListItemIcon>
//           {t('logout')}
//         </MenuItem>
//       </Menu>
//     </>
//   );
// };
