// 'use client';

// import Link from 'next/link';
// import { useMemo } from 'react';

// import ArrowForward from '@mui/icons-material/ArrowForward';
// import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// import { withEmptyRender } from '@/components/table/utils';
// import useFormatDate from '@/hooks/use-format-date';
// import { useTranslations } from '@/providers/translation-provider/client';
// import { formatNumber } from '@/utils/number';

// import { ContainerSessionKey } from '../config';
// import { ContainerItem } from '../type';
// import { onSendTrackingGAContainer } from '../utils';

// export const defaultColumnExportFields = [
//   'container_name',
//   'total_weight',
//   'seal_number',
//   'doa_packing_house_number',
//   'packing_house',
//   'date_created',
// ];

// export function useColumns() {
//   const t = useTranslations('container');
//   const { formatDateTime } = useFormatDate();

//   const columns = useMemo(
//     () =>
//       withEmptyRender<ContainerItem>([
//         {
//           field: 'containerName',
//           headerName: t('container-number'),
//           flex: 1,
//           sortable: false,
//           renderCell: ({ row }) => row.containerNumber,
//         },
//         {
//           field: 'totalWeight',
//           headerName: t('total-weight'),
//           width: 140,
//           sortable: false,
//           align: 'right',
//           renderCell: ({ row }) => formatNumber(row.totalWeight),
//         },
//         {
//           field: 'sealNumber',
//           headerName: t('seal-number'),
//           flex: 1,
//           renderCell: ({ row }) => row.sealNumbers,
//         },
//         {
//           field: 'doaPackingHouseNumber',
//           headerName: t('doa-packing-house-number'),
//           flex: 1,
//           sortable: false,
//         },
//         {
//           field: 'packingHouse',
//           headerName: t('packing-house'),
//           renderCell: ({ row }) => {
//             return (
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1,
//                   justifyContent: 'flex-start',
//                   height: '100%',
//                   width: '100%',
//                 }}
//               >
//                 <LocationOnOutlined sx={{ color: 'grey.400' }} />
//                 <Box>
//                   <Typography
//                     sx={{
//                       fontSize: '0.875rem',
//                       fontWeight: 500,
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     {row.supplierName}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       fontSize: '0.775rem',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     {row.supplierAddress}
//                   </Typography>
//                 </Box>
//               </Box>
//             );
//           },
//           flex: 2,
//           sortable: false,
//         },
//         {
//           field: 'dateCreated',
//           headerName: t('created-date'),
//           flex: 1,
//           renderCell: ({ row }) => formatDateTime(row.dateCreated),
//           sortable: false,
//           sortComparator: ({ row }) => {
//             const dateA = new Date(row.dateCreated).getTime();
//             const dateB = new Date(row.dateCreated).getTime();
//             return dateA - dateB;
//           },
//         },
//         {
//           field: 'actions',
//           headerName: t('actions'),
//           flex: 0.5,
//           renderCell: ({ row }) => (
//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: '100%',
//                 width: '100%',
//               }}
//             >
//               <Link
//                 prefetch={false}
//                 href={`/container/${row.containerId}&containerNumber=${row.containerNumber}&tab=production-diary`}
//                 onClick={() => {
//                   const searchParams = new URLSearchParams(window.location.search);
//                   sessionStorage.setItem(ContainerSessionKey, searchParams.toString());
//                   onSendTrackingGAContainer(row.containerId);
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     borderRadius: '50%',
//                     width: 32,
//                     height: 32,
//                     ':hover': {
//                       bgcolor: 'background.default',
//                     },
//                   }}
//                 >
//                   <ArrowForward />
//                 </Box>
//               </Link>
//             </Box>
//           ),
//           sortable: false,
//           hideable: false,
//         },
//       ]),
//     [formatDateTime, t]
//   );

//   return {
//     columns,
//   };
// }
