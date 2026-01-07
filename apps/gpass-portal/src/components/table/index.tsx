'use client';

import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';
import type {
  DataGridProps,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { type GridStateColDef, GridToolbar } from '@mui/x-data-grid/internals';

import { useDragColumns } from '@/hooks/use-drag-columns';
import { useFullscreenContainer } from '@/hooks/use-fullscreen-container';
import {
  useTranslations,
  useTranslationsContext,
} from '@/providers/translation-provider/client';

import { CustomSortIcon } from './custom-sort-icon';
import styles from './styles.module.css';
import { thaiLocaleText } from './utils';

const DEFAULT_PAGINATION_MODEL: GridPaginationModel = {
  page: 0,
  pageSize: 10,
};

interface CustomPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const CustomPagination = ({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: CustomPaginationProps) => {
  const tableT = useTranslations('table');
  const container = useFullscreenContainer();

  const pageCount = Math.ceil(total / pageSize);
  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, total);

  const displayText =
    total === 0
      ? tableT('pagination-empty')
      : tableT('pagination', { start, end, total });

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      p={2}
      width='100%'
      gap={6}
    >
      <Box display='flex' alignItems='center'>
        <Select<number>
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          size='small'
          sx={{ height: 32 }}
          MenuProps={{
            container: container,
          }}
        >
          {[5, 10, 20, 50, 100].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ marginLeft: 2, width: '100%' }}>
          <Typography
            color='text.secondary'
            textTransform='lowercase'
            sx={{ fontSize: '0.875rem', display: 'block', width: '100%' }}
          >
            {displayText}
          </Typography>
        </Box>
      </Box>

      <Box display='flex' alignItems='center' gap={1}>
        <Pagination
          count={pageCount}
          page={page + 1}
          color='primary'
          shape='rounded'
          onChange={(_, value) => onPageChange(value - 1)}
        />
      </Box>
    </Box>
  );
};

interface TableCustomProps {
  toolbar?: () => ReactNode;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  heightOffset?: number;
}

type Props<T extends GridValidRowModel = any> = Omit<
  DataGridProps<T>,
  'pagination' | 'slots'
> &
  TableCustomProps & {
    slots?: DataGridProps<T>['slots'];
  };

const Table = <T extends GridValidRowModel = any>({
  // Custom props
  toolbar,
  onPageChange,
  onPageSizeChange,
  heightOffset = 160,

  // data props
  rows,
  columns,
  rowCount,

  // pagination props
  paginationModel,

  // styling props
  classes,
  sx,
  columnVisibilityModel,

  // slots
  slots,

  // Rest of props
  ...dataGridProps
}: Props<T>) => {
  const { locale } = useTranslationsContext();
  const { columns: columnsWithDrag } = useDragColumns<T>(columns as GridColDef<T>[]);
  const fullscreenContainer = useFullscreenContainer();
  const isFullScreen = !!fullscreenContainer;

  const currentPaginationModel = paginationModel ?? DEFAULT_PAGINATION_MODEL;

  const handlePageChange = (newPage: number) => {
    onPageChange?.(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    onPageChange?.(0);
    onPageSizeChange?.(newPageSize);
  };

  return (
    <DataGrid<T>
      showToolbar
      sortingOrder={['desc', 'asc']}
      localeText={locale === 'th' ? thaiLocaleText : undefined}
      disableRowSelectionOnClick
      disableColumnMenu
      // Layout
      rowHeight={64}
      rows={rows}
      columnHeaderHeight={40}
      columns={columnsWithDrag}
      rowCount={rowCount}
      paginationModel={currentPaginationModel}
      initialState={{
        pagination: { paginationModel: DEFAULT_PAGINATION_MODEL },
        columns: { columnVisibilityModel },
      }}
      // Custom slots
      slots={{
        toolbar: toolbar ?? GridToolbar,
        pagination: () => (
          <CustomPagination
            page={currentPaginationModel.page}
            pageSize={currentPaginationModel.pageSize}
            total={rowCount || 0}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        ),
        columnHeaderSortIcon: (props) => (
          <CustomSortIcon
            asc={props.direction === 'asc'}
            desc={props.direction === 'desc'}
          />
        ),
        ...slots,
      }}
      // Styling
      classes={{
        columnHeaderTitleContainer: styles.columnHeaderTitleContainer,
        columnHeaderTitleContainerContent: styles.columnHeaderTitleContainerContent,
        columnHeaderTitle: styles.columnHeaderTitle,
        cell: styles.cell,
        ...classes,
      }}
      sx={{
        '& .MuiDataGrid-columnHeader': {
          bgcolor: 'brand.50',
          fontSize: 14,
        },
        '& .MuiDataGrid-cell': {
          fontSize: 16,
        },
        '& .MuiDataGrid-scrollbarFiller.MuiDataGrid-scrollbarFiller--header': {
          bgcolor: 'brand.50',
        },
        '& .MuiDataGrid-filler': {
          display: 'none',
        },
        '& .MuiDataGrid-cell:focus-within': {
          outline: 'none',
        },
        maxHeight: isFullScreen
          ? 'calc(100vh - 130px)'
          : `calc(100dvh - var(--header-height) - ${heightOffset}px)`,
        minHeight: isFullScreen
          ? 'calc(100vh - 130px)'
          : `calc(100dvh - var(--header-height) - ${heightOffset}px)`,
        display: 'flex',
        flexDirection: 'column',
        '& .MuiDataGrid-main': {
          flex: 1,
          overflow: 'hidden',
        },
        '& .MuiDataGrid-virtualScroller': {
          flex: 1,
          overflow: 'auto',
        },
        '& .MuiDataGrid-footerContainer': {
          position: 'sticky',
          bottom: 0,
          margin: 0,
          maxHeight: '50px',
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          zIndex: 1,
        },
        ...sx,
      }}
      // Other DataGrid props
      {...dataGridProps}
    />
  );
};

export default Table;
export { useGridApiContext, GridToolbar };
export type { GridColDef, GridRowParams, GridStateColDef };
