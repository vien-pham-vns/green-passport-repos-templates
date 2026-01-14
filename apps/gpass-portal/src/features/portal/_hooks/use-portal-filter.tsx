// 'use client';
// import { useSearchParams } from 'next/navigation';

// import { toDayjs } from 'utils/date';

// import { useNavigation } from '@/hooks/use-navigation';

// type PortalFilters = Record<string, any>;

// export function usePortalFilter() {
//   'use memo';

//   const searchParams = useSearchParams();
//   const { navigate } = useNavigation();

//   const fromDateParam = searchParams.get('fromDate');
//   const toDateParam = searchParams.get('toDate');

//   const filters: PortalFilters = {
//     fromDate: fromDateParam ?? null,
//     toDate: toDateParam ?? null,
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

//   const handleFiltersChange = (updatedFilters: Partial<PortalFilters>) => {
//     const updates: Record<string, string | null | undefined> = {
//       page: '1', // Reset to first page on filter change
//     };

//     // To date
//     if (updatedFilters.toDate !== undefined) {
//       updates.toDate = updatedFilters.toDate
//         ? toDayjs(updatedFilters.toDate)?.format('YYYY-MM-DD')
//         : null;
//     }

//     // From date
//     if (updatedFilters.fromDate !== undefined) {
//       updates.fromDate = updatedFilters.fromDate
//         ? toDayjs(updatedFilters.fromDate)?.format('YYYY-MM-DD')
//         : null;
//     }

//     updateSearchParams(updates);
//   };

//   const handleClearFilters = () => {
//     const clearedFilters: Partial<PortalFilters> = {
//       fromDate: null,
//       toDate: null,
//     };
//     handleFiltersChange(clearedFilters);
//   };

//   const hasActiveFilters = Boolean(filters.fromDate || filters.toDate);

//   let activeFilterCount = 0;
//   if (filters.fromDate || filters.toDate) activeFilterCount++;

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
