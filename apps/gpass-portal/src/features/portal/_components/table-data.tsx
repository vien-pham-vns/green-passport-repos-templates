'use client';

import type { Sort } from 'types/common';

import Table from '@/components/table';
import Setting from '@/components/table/setting';
import { useNavigation } from '@/hooks/use-navigation';

import { useColumns } from '../_hooks/use-columns';
import { ApplicationItem } from '../type';

interface PaginationProps {
  model: { page: number; pageSize: number };
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  total: number;
}
interface SortProps {
  sort: Sort;
  onSortChange: (sortModel: any) => void;
}
interface SettingsProps {
  anchorEl: HTMLElement | null;
  onAnchorChange: (anchor: HTMLElement | null) => void;
  onColumnsVisibilityChange: (columnsVisibility: any) => void;
}
interface PortalDataTableProps {
  data: ApplicationItem[];
  loading: boolean;
  pagination: PaginationProps;
  sorting: SortProps;
  settings: SettingsProps;
  total?: number;
}
export default function PortalDataTable({
  data,
  loading,
  pagination,
  sorting,
  settings,
  total,
}: PortalDataTableProps) {
  const { columns } = useColumns();
  const { navigate } = useNavigation();

  return (
    <Table<ApplicationItem>
      // Sorting
      sortingMode='server'
      sortModel={
        sorting.sort ? [{ field: sorting.sort.field, sort: sorting.sort.direction }] : []
      }
      onSortModelChange={sorting.onSortChange}
      // Pagination
      paginationMode='server'
      paginationModel={pagination.model}
      onPageChange={pagination.onPageChange}
      onPageSizeChange={pagination.onPageSizeChange}
      // Data
      rows={data}
      rowCount={total}
      loading={loading}
      columns={columns}
      // Events
      onRowClick={({ row }) => {
        const detailSearchParams = new URLSearchParams(window.location.search);
        detailSearchParams.set('id', 'abc');

        navigate(`/portal/${row.id}?${detailSearchParams.toString()}`);
      }}
      // Toolbar
      toolbar={() => (
        <Setting
          anchorEl={settings.anchorEl}
          onClose={(columnsVisibility) => {
            settings.onColumnsVisibilityChange?.(columnsVisibility);
            settings.onAnchorChange(null);
          }}
        />
      )}
      // Performance
      rowBufferPx={500}
      columnBufferPx={30}
      sx={{
        '& .MuiDataGrid-row': {
          cursor: 'pointer',
        },
      }}
    />
  );
}
