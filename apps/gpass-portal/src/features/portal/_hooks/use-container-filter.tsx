// 'use memo'; // react compiler opt-in
// import { useSearchParams } from 'next/navigation';

// import dayjs from 'dayjs';
// import { toDayjs } from 'utils/date';

// import { useNavigation } from '@/hooks/use-navigation';

// import { ContainerFilters } from '../type';

// export function useContainerFilter() {
//   const searchParams = useSearchParams();
//   const { navigate } = useNavigation();

//   const fromDateParam = searchParams.get('fromDate');
//   const toDateParam = searchParams.get('toDate');
//   const weightMinParam = searchParams.get('weightMin');
//   const weightMaxParam = searchParams.get('weightMax');

//   const filters: ContainerFilters = {
//     fromDate: fromDateParam ? dayjs(fromDateParam, 'YYYY-MM-DD') : null,
//     toDate: toDateParam ? dayjs(toDateParam, 'YYYY-MM-DD') : null,
//     weightMin: weightMinParam ? Number(weightMinParam) : undefined,
//     weightMax: weightMaxParam ? Number(weightMaxParam) : undefined,
//   };

//   const updateSearchParams = (updates: Record<string, string | null | undefined>) => {
//     const params = new URLSearchParams(searchParams.toString());

//     Object.entries(updates).forEach(([key, value]) => {
//       if (value === null || value === undefined) {
//         params.delete(key);
//       } else {
//         params.set(key, value);
//       }
//     });

//     navigate(`?${params.toString()}`, { scroll: false });
//   };

//   const handleFiltersChange = (updatedFilters: Partial<ContainerFilters>) => {
//     const updates: Record<string, string | null | undefined> = {
//       page: '1', // Reset to first page on filter change
//     };

//     // From date
//     if (updatedFilters.fromDate !== undefined) {
//       updates.fromDate =
//         updatedFilters.fromDate && updatedFilters.fromDate instanceof Object
//           ? toDayjs(updatedFilters.fromDate)?.format('YYYY-MM-DD')
//           : null;
//     }

//     // To date
//     if (updatedFilters.toDate !== undefined) {
//       updates.toDate =
//         updatedFilters.toDate && updatedFilters.toDate instanceof Object
//           ? toDayjs(updatedFilters.toDate)?.format('YYYY-MM-DD')
//           : null;
//     }

//     // Weight Min - handle undefined to remove from URL
//     if ('weightMin' in updatedFilters) {
//       updates.weightMin = updatedFilters.weightMin
//         ? String(updatedFilters.weightMin)
//         : undefined;
//     }

//     // Weight Max - handle undefined to remove from URL
//     if ('weightMax' in updatedFilters) {
//       updates.weightMax = updatedFilters.weightMax
//         ? String(updatedFilters.weightMax)
//         : undefined;
//     }

//     updateSearchParams(updates);
//   };

//   const handleClearFilters = () => {
//     return {
//       fromDate: null,
//       toDate: null,
//       weightMin: undefined,
//       weightMax: undefined,
//     };
//   };

//   const hasActiveFilters = Boolean(
//     filters.fromDate ||
//     filters.toDate ||
//     filters.weightMin !== undefined ||
//     filters.weightMax !== undefined
//   );

//   let activeFilterCount = 0;
//   if (filters.fromDate || filters.toDate) activeFilterCount++;
//   if (filters.weightMin !== undefined || filters.weightMax !== undefined)
//     activeFilterCount++;

//   return {
//     filters,
//     hasActiveFilters,
//     activeFilterCount,
//     actions: {
//       handleFiltersChange,
//       handleClearFilters,
//     },
//   };
// }
