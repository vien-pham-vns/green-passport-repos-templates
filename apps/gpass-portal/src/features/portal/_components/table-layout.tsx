// 'use client';

// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { GridStateColDef } from '@mui/x-data-grid/internals';
// import {
//   IconRefresh,
//   IconSettings,
//   IconZoom,
//   IconZoomExclamationFilled,
// } from '@tabler/icons-react';
// import type { Sort } from 'types/common';

// import { TableView as TableViewLayout } from '@/components/layouts/table-view';
// import { TableViewFilter } from '@/components/layouts/table-view-filter';
// import useFullScreen from '@/hooks/use-full-screen';
// import { useNavigation } from '@/hooks/use-navigation';
// import { usePagination } from '@/hooks/use-pagination';
// import { useTranslations } from '@/providers/translation-provider/client';
// import { toSnake } from '@/utils/transform';

// import { usePortalFilter } from '../_hooks/use-portal-filter';
// import { ApplicationSearchParams, ApplicationTableResponse } from '../type';
// import { queryToUrlString } from '../utils';
// import PortalDataTable from './table-data';

// type PortalTableLayoutProps = {
//   applicationData: ApplicationTableResponse;
//   query: Partial<ApplicationSearchParams>;
// };

// export const PortalTableLayout = ({ query, applicationData }: PortalTableLayoutProps) => {
//   'use memo';

//   const searchParams = useSearchParams();
//   const { isPending, navigate, refresh } = useNavigation();
//   const { full, ref, toggleFullScreen } = useFullScreen();

//   const t = useTranslations('');

//   // Pagination
//   const { handlePageChange, handlePageSizeChange, paginationModel } = usePagination({
//     page: query.page ?? 1,
//     size: query.size ?? 20,
//   });

//   // Filter management
//   const filterHook = usePortalFilter();
//   const { filters, actions } = filterHook;

//   console.log('===DEBUG=== portal-filters', filters);

//   const [anchorSetting, setAnchorSetting] = useState<HTMLElement | null>(null);

//   const displaySort: Sort = {
//     field: query?.sort?.field ?? '',
//     direction: query?.sort?.direction ?? 'desc',
//   };

//   const onColumnsVisibilityChange = (columns: GridStateColDef[]) => {
//     return columns.map((c) => toSnake(c.field)).filter((f) => f !== 'actions');
//   };

//   const handleClickSetting = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorSetting(event.currentTarget);
//   };

//   const handleClickRefresh = () => {
//     refresh();
//   };

//   // Sync default params to URL on first load (when URL has no params)
//   useEffect(() => {
//     const hasParams = searchParams.toString().length > 0;
//     if (!hasParams) {
//       navigate(`?${queryToUrlString(query)}`, { scroll: false });
//     }
//   }, []);

//   return (
//     <TableViewLayout variant='default' ref={ref}>
//       <TableViewLayout.Content>
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: 1,
//             mb: 2,
//           }}
//         >
//           <Typography
//             fontSize={20}
//             fontWeight={600}
//             variant='h1'
//             display='flex'
//             alignItems='center'
//           >
//             {t('header')}
//           </Typography>
//         </Box>

//         <Box sx={{ mb: 2 }}>
//           <TableViewFilter.Root>
//             <TableViewFilter.Left>
//               <Box sx={{ width: '100%' }}>
//                 <TableViewFilter.Search
//                   customWidth={500}
//                   placeholder={t('search-placeholder')}
//                   isParentPending={isPending}
//                 />
//               </Box>
//             </TableViewFilter.Left>

//             <TableViewFilter.Right>
//               <Stack
//                 direction={{ xs: 'row', md: 'row' }}
//                 spacing={1}
//                 alignItems='center'
//                 sx={{
//                   width: { xs: '100%', md: 'auto' },
//                   flexWrap: { xs: 'wrap', md: 'nowrap' },
//                 }}
//               >
//                 {/* <FeedbackFilter
//                   filters={filters}
//                   onClearFilterChange={actions.handleClearFilters}
//                   onApplyFilterChange={(items) => actions.handleFiltersChange(items)}
//                 /> */}
//                 <Divider
//                   orientation='vertical'
//                   flexItem
//                   sx={{
//                     display: { xs: 'none', md: 'flex' },
//                   }}
//                 />

//                 <Button
//                   variant='outlined'
//                   startIcon={<IconSettings />}
//                   onClick={handleClickSetting}
//                 >
//                   Settings
//                 </Button>

//                 <Button
//                   variant='outlined'
//                   startIcon={<IconRefresh />}
//                   onClick={handleClickRefresh}
//                 >
//                   Refresh
//                 </Button>

//                 <Button
//                   variant='outlined'
//                   startIcon={full ? <IconZoom /> : <IconZoomExclamationFilled />}
//                   onClick={toggleFullScreen}
//                 >
//                   FullScreen
//                 </Button>
//               </Stack>
//             </TableViewFilter.Right>
//           </TableViewFilter.Root>
//         </Box>

//         <PortalDataTable
//           data={applicationData.data.data || []}
//           loading={isPending}
//           total={applicationData.data.total}
//           pagination={{
//             model: paginationModel,
//             onPageChange: handlePageChange,
//             onPageSizeChange: handlePageSizeChange,
//             total: applicationData?.data?.total ?? 0,
//           }}
//           sorting={{
//             sort: displaySort,
//             onSortChange: (sortModel) => {
//               const newSearchParams = new URLSearchParams(searchParams.toString());
//               if (sortModel.length > 0) {
//                 const firstSort = sortModel[0];
//                 const sortString = `${firstSort?.field}:${firstSort?.sort}`;
//                 newSearchParams.set('sort', sortString);
//                 newSearchParams.set('page', '1');
//                 navigate(`?${newSearchParams.toString()}`, { scroll: false });
//               }
//             },
//           }}
//           settings={{
//             anchorEl: anchorSetting,
//             onAnchorChange: setAnchorSetting,
//             onColumnsVisibilityChange,
//           }}
//         />
//       </TableViewLayout.Content>
//     </TableViewLayout>
//   );
// };
