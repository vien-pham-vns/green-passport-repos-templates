// import { useQuery } from '@tanstack/react-query';

// import globalQueries from '@/app/global-queries';
// import useProvinceLicensePlateStore from '@/store/use-province-vehicle-registration-store';

// interface UseProvinceLicensePlateOptions {
//   enabled?: boolean;
// }

// /**
//  * Custom hook to fetch province license plate data
//  * Automatically updates the province store when data is fetched
//  * @param options - Query options including enabled flag
//  */
// export const useProvinceLicensePlateQuery = (
//   options?: UseProvinceLicensePlateOptions
// ) => {
//   return useQuery({
//     ...globalQueries.province(),
//     enabled: options?.enabled ?? true,
//     select: (data) => {
//       const provinces = data.data || [];
//       // Update store when data is fetched
//       if (provinces.length > 0) {
//         useProvinceLicensePlateStore.setState({ data: provinces });
//       }
//       return provinces;
//     },
//   });
// };

// export default useProvinceLicensePlateQuery;
