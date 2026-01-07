'use memo';

import { useSearchParams } from 'next/navigation';

import { useNavigation } from './use-navigation';

interface UsePaginationOptions {
  page: number;
  size: number;
}

/**
 * Custom hook to handle pagination state with URL synchronization
 */
export const usePagination = ({ page, size }: UsePaginationOptions) => {
  const searchParams = useSearchParams();
  const { navigate } = useNavigation();

  const updatePagination = (newPage: number, newSize?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage + 1));

    if (newSize !== undefined) {
      params.set('size', String(newSize));
    }

    navigate(`?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (currentPage: number) => updatePagination(currentPage);

  const handlePageSizeChange = (pageSize: number) => updatePagination(0, pageSize);

  return {
    handlePageChange,
    handlePageSizeChange,
    paginationModel: { page: page - 1, pageSize: size },
  };
};

export default usePagination;
