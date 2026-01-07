// 'use client';

// // import {
// //   Drawer,
// //   ListItem,
// //   ListItemIcon,
// //   ListItemButton,
// //   Stack,
// // } from 'components';
// import { Button, IconButton } from 'components/form';
// import {
//   AlertCircle,
//   Warning,
//   BugReport,
//   NotificationsNone,
//   Notifications,
// } from '@/components/icons';
// import Link from 'next/link';

// import useNotificationsStore from '@/store/use-notifications-store';
// import { NotificationType, NotiVariant, RejectReason } from 'types/notification';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { uuid } from 'short-uuid';
// import { useTranslations } from '@/providers/translation-provider/client';
// import { dayjs } from 'utils/date';
// import useText from '@/hooks/use-text';
// import { sendTrackingEvent } from 'utils/gtag';
// import { GA_EVENT, POSTHOG_EVENT } from 'constant';
// import { capturePosthog } from 'utils/posthog';
// import CardHeader from '@mui/material/CardHeader';
// import Card from '@mui/material/Card';
// import Skeleton from '@mui/material/Skeleton';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Badge from '@mui/material/Badge';
// import Drawer from '@mui/material/Drawer';
// import Typography from '@mui/material/Typography';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemButton from '@mui/material/ListItemButton';
// import Stack from '@mui/material/Stack';

// const StyledTypo = styled(Typography)({
//   display: '-webkit-box',
//   WebkitLineClamp: 3,
//   WebkitBoxOrient: 'vertical',
//   overflow: 'hidden',
//   textOverflow: 'ellipsis',
// });

// const HEADER_HEIGHT = 80;
// const SCROLL_ID = uuid();

// const getLink = (notification: NotificationType) => {
//   switch (notification.rejectReason) {
//     case RejectReason.EARLY_HARVESTING:
//     case RejectReason.WEIGHT_GAIN:
//     case RejectReason.GAP_VIOLATION:
//     case RejectReason.GAP_USED:
//       return `/event/${notification.batchlot}`;
//     default:
//       return '#';
//   }
// };

// const Loading = ({ cardLength = 4, noShadow = false }) => {
//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//       {Array.from({ length: cardLength }).map((_, index) => (
//         <Card key={index} sx={{ boxShadow: noShadow ? 'none' : undefined }}>
//           <CardHeader
//             avatar={
//               <Skeleton animation='wave' variant='circular' width={40} height={40} />
//             }
//             title={
//               <Skeleton
//                 animation='wave'
//                 height={20}
//                 width='80%'
//                 style={{ marginBottom: 6 }}
//               />
//             }
//             subheader={<Skeleton animation='wave' height={20} width='40%' />}
//           />
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export const AppNotification: React.FC = () => {
//   const {
//     getMore,
//     hasMore,
//     data,
//     firstTimeLoading,
//     openNoti,
//     closeNoti,
//     isOpenNoti,
//     newNotiCount,
//     updateSeen,
//     updateSeenAll,
//   } = useNotificationsStore();
//   const theme = useTheme();
//   const t = useTranslations('common');
//   const { getText } = useText();

//   const getAlertStyle = (type: NotiVariant) => {
//     switch (type) {
//       case NotiVariant.CRITICAL:
//         return {
//           icon: <AlertCircle color={theme.palette.error.main} />,
//           bgColor: '#FFEBEE',
//         };
//       case NotiVariant.WARNING:
//         return {
//           icon: <Warning color={theme.palette.warning.main} />,
//           bgColor: '#FFF3E0',
//         };
//       case NotiVariant.INFO:
//         return {
//           icon: <BugReport color={theme.palette.info.main} />,
//           bgColor: '#E3F2FD',
//         };
//       default:
//         return { icon: <NotificationsNone /> };
//     }
//   };

//   return (
//     <>
//       {/* Alert Icon with Badge */}
//       <IconButton color='inherit' onClick={openNoti}>
//         <Badge badgeContent={newNotiCount > 99 ? '99+' : newNotiCount} color='error'>
//           <Notifications color={theme.palette.text.secondary} />
//         </Badge>
//       </IconButton>

//       <Drawer anchor='right' open={isOpenNoti} onClose={closeNoti}>
//         <Box
//           sx={{
//             width: 420,
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'flex-end',
//             position: 'relative',
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               p: 2,
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//             }}
//           >
//             <Typography variant='body1' mb={0} gutterBottom fontWeight={600}>
//               {t('notification')}
//             </Typography>
//             <Button size='small' sx={{ textTransform: 'none' }} onClick={updateSeenAll}>
//               {t('mark-all-as-read')}
//             </Button>
//             {/* <AlertConfigForm /> */}
//           </Box>

//           <Box
//             id={SCROLL_ID}
//             sx={{
//               height: `calc(100% - ${HEADER_HEIGHT}px)`,
//               overflow: 'auto',
//               px: 2,
//               my: 2,
//             }}
//           >
//             {firstTimeLoading ? (
//               <Loading />
//             ) : (
//               <InfiniteScroll
//                 dataLength={data.length}
//                 next={getMore}
//                 hasMore={hasMore}
//                 loader={<Loading cardLength={2} noShadow />}
//                 scrollableTarget={SCROLL_ID}
//               >
//                 {data.map((alert) => {
//                   const { icon } = getAlertStyle(alert.variant);
//                   const { unread, title, description, translations, createdTime, id } =
//                     alert;

//                   return (
//                     <ListItem divider sx={{ borderRadius: 1, p: 0 }} key={alert.id}>
//                       <ListItemButton sx={{ justifyContent: 'space-between' }}>
//                         <ListItemIcon>{icon}</ListItemIcon>

//                         <Link
//                           style={{
//                             textDecoration: 'none',
//                             color: 'inherit',
//                             flex: 1,
//                             overflow: 'hidden',
//                           }}
//                           onClick={() => {
//                             updateSeen(id);
//                             closeNoti();
//                             if (alert.variant === NotiVariant.CRITICAL) {
//                               capturePosthog(
//                                 POSTHOG_EVENT.GAP_HEATMAP.GAP_ALERT_CLICKED,
//                                 {
//                                   eventId: alert.batchlot,
//                                 }
//                               );
//                               sendTrackingEvent(GA_EVENT.GAP_HEATMAP.GAP_ALERT_CLICKED);
//                             }
//                           }}
//                           href={getLink(alert)}
//                         >
//                           <Stack gap={0.5}>
//                             <StyledTypo
//                               fontWeight={unread ? '500' : 'normal'}
//                               color='textPrimary'
//                             >
//                               {translations?.title ? getText(translations.title) : title}
//                             </StyledTypo>

//                             <StyledTypo
//                               fontWeight={unread ? '500' : 'normal'}
//                               fontSize={14}
//                               lineHeight={1.3}
//                               color='textSecondary'
//                             >
//                               {translations?.desc
//                                 ? getText(translations.desc)
//                                 : description}
//                             </StyledTypo>

//                             <StyledTypo
//                               fontSize={12}
//                               color='textSecondary'
//                               fontWeight={unread ? '500' : 'normal'}
//                             >
//                               {dayjs(createdTime).fromNow()}
//                             </StyledTypo>
//                           </Stack>
//                         </Link>

//                         <Box
//                           sx={{
//                             width: 20,
//                             display: 'flex',
//                             justifyContent: 'flex-end',
//                           }}
//                         >
//                           {unread && (
//                             <Box
//                               sx={{
//                                 width: 12,
//                                 height: 12,
//                                 backgroundColor: theme.palette.info.main,
//                                 borderRadius: '50%',
//                               }}
//                               onClick={() => updateSeen(id)}
//                             />
//                           )}
//                         </Box>
//                       </ListItemButton>
//                     </ListItem>
//                   );
//                 })}
//               </InfiniteScroll>
//             )}
//           </Box>
//         </Box>
//       </Drawer>
//     </>
//   );
// };
