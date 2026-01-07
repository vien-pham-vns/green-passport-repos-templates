// import { useQuery } from '@tanstack/react-query';

// import { useFeatureFlagsStore } from '@/store/use-feature-flags-store';

// interface UseFeatureFlagsOptions {
//   enabled?: boolean;
// }

// /**
//  * Custom hook to fetch feature flags
//  * @param options - Query options including enabled flag
//  */
// export const useFeatureFlagsQuery = (options?: UseFeatureFlagsOptions) => {
//   return useQuery({
//     ...globalQueries.featureFlags(),
//     enabled: options?.enabled ?? true,
//     select: (data) => {
//       useFeatureFlagsStore.setState({ flags: data });
//       return data;
//     },
//   });
// };

// export default useFeatureFlagsQuery;
