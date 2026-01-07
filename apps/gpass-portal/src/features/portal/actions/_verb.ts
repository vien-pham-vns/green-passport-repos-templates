// 'use server';

// import { cache } from 'react';

// import { transformContainerDetail } from '@features/container/container-queries';
// import { apiCore } from 'services/common';
// import { ContainerDetailApiResponse, ContainerDetailData } from 'services/container';
// import { logHttpRequest } from 'utils/logger';
// import { toCamel } from 'utils/transform';

// import { getHeaderAccessToken } from '@/lib/auth';

// export const fetchContainerDetailById = cache(
//   async (id: string): Promise<ContainerDetailData | null> => {
//     const accessToken = await getHeaderAccessToken();
//     if (!accessToken) {
//       throw new Error('Unauthorized');
//     }

//     const startTime = Date.now();
//     const url = `${apiCore(`/container/${id}`, 'v1')}`;

//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//       next: { revalidate: 60, tags: ['container-detail'] },
//     });

//     // Log HTTP request
//     const duration = Date.now() - startTime;
//     logHttpRequest('GET', url, response.status, duration, 'ContainerDetailAPI');

//     if (!response) {
//       return null;
//     }

//     const result = await response.json();
//     const formatData = toCamel(result) as ContainerDetailApiResponse;
//     return transformContainerDetail(formatData);
//   }
// );
