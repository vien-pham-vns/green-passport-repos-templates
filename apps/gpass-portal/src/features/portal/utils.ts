// import { Sort } from '@/types/common';

// export function parseSearchParams(
//   queryParams: Awaited<ContainerPageProps['searchParams']>
// ) {
//   const sortString = queryParams.sort || '';
//   const [field, direction] = sortString.split(':');
//   const sort: Sort = {
//     field: field || '',
//     direction: direction === 'asc' ? 'asc' : 'desc',
//   };

//   return {
//     q: queryParams.q || '',
//     fromDate: queryParams.fromDate,
//     toDate: queryParams.toDate,
//     page: Number(queryParams.page) || 1,
//     size: Number(queryParams.size) || 20,
//     sort,
//     weightMin: queryParams.weightMin ? Number(queryParams.weightMin) : undefined,
//     weightMax: queryParams.weightMax ? Number(queryParams.weightMax) : undefined,
//   };
// }
