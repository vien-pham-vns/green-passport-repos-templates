'use client';

import { JSX, useCallback } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  DataGrid,
  type DataGridProps,
  type GridColDef,
  type GridColumnVisibilityModel,
  type GridRowParams,
  type GridValidRowModel,
  gridPageSizeSelector,
  useGridApiContext,
} from '@mui/x-data-grid';
import {
  type GridStateColDef,
  GridToolbar,
  useGridSelector,
} from '@mui/x-data-grid/internals';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

import { useDragColumns } from '@/hooks/use-drag-columns';
import { useFullscreenContainer } from '@/hooks/use-fullscreen-container';
import { useTranslationsContext } from '@/providers/translation-provider/client';

import styles from './styles.module.css';
import { thaiLocaleText } from './utils';

type CustomToolbarProps = {
  showToolbarColumnsButton?: boolean;
  showToolbarFilterButton?: boolean;
  showToolbarDensitySelector?: boolean;
  showToolbarExport?: boolean;
  showToolbarQuickFilter?: boolean;
};
// const CustomToolbar = ({
//   showToolbarColumnsButton = true,
//   showToolbarFilterButton = true,
//   showToolbarDensitySelector = true,
//   showToolbarExport = true,
//   showToolbarQuickFilter = true,
// }: CustomToolbarProps) => {
//   return (
//     <GridToolbarContainer
//       sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', p: 1 }}
//     >
//       {showToolbarQuickFilter && (
//         <GridToolbarQuickFilter
//           quickFilterParser={(searchInput) =>
//             searchInput.split(',').map((value) => value.trim())
//           }
//           debounceMs={300}
//         />
//       )}

//       <Box sx={{ display: 'flex', gap: 1 }}>
//         {showToolbarColumnsButton && <GridToolbarColumnsButton />}
//         {showToolbarFilterButton && <GridToolbarFilterButton />}
//         {showToolbarDensitySelector && <GridToolbarDensitySelector />}
//         {showToolbarExport && <GridToolbarExport />}
//       </Box>
//     </GridToolbarContainer>
//   );
// };

interface CursorPaginationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  currentPage?: number;
  totalPages?: number;
}

const CustomPagination = (props: CursorPaginationProps) => {
  const { onPrevious, onNext, canGoNext = false, canGoPrevious = false } = props;

  const apiRef = useGridApiContext();
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    apiRef.current.setPageSize(Number(event.target.value));
  };

  const handlePrevious = () => {
    if (canGoPrevious && onPrevious) {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (canGoNext && onNext) {
      onNext();
    }
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      p={2}
      width='100%'
    >
      <Box display='flex' alignItems='center' gap={2}>
        <Select<number>
          value={pageSize}
          onChange={handlePageSizeChange}
          size='small'
          sx={{ height: 32 }}
        >
          {[5, 10, 20, 50, 100].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box display='flex' alignItems='center' gap={1}>
        <IconButton
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          size='small'
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            color: 'action.active',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <IconArrowLeft size={20} />
        </IconButton>

        <IconButton
          onClick={handleNext}
          disabled={!canGoNext}
          size='small'
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            color: 'action.active',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <IconArrowRight size={20} />
        </IconButton>
      </Box>
    </Box>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props<T extends GridValidRowModel = any> = DataGridProps<T> & {
  toolbarProps?: CustomToolbarProps;
  toolbar?: () => JSX.Element;
  columnVisibilityModel?: GridColumnVisibilityModel;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableCursor = <T extends GridValidRowModel = any>({
  toolbar,
  rows,
  classes,
  paginationModel,
  slots,
  onPaginationModelChange,
  columns,
  sx,
  columnVisibilityModel,
  hasNextPage = false,
  hasPreviousPage = false,
  onNextPage,
  onPreviousPage,
  ...props
}: Props) => {
  const { columns: columnsWithDrag } = useDragColumns<T>(columns as GridColDef<T>[]);
  const { locale } = useTranslationsContext();
  const fullscreenContainer = useFullscreenContainer();
  const isFullScreen = !!fullscreenContainer;

  const handlePrevious = useCallback(() => {
    if (hasPreviousPage && onPreviousPage) {
      onPreviousPage();
    }
  }, [hasPreviousPage, onPreviousPage]);

  const handleNext = useCallback(() => {
    if (hasNextPage && onNextPage) {
      onNextPage();
    }
  }, [hasNextPage, onNextPage]);

  return (
    <div className={styles.container}>
      <DataGrid
        sortingOrder={['desc', 'asc']}
        localeText={locale === 'th' ? thaiLocaleText : undefined}
        initialState={{
          columns: {
            columnVisibilityModel: columnVisibilityModel,
          },
        }}
        disableRowSelectionOnClick
        disableColumnMenu
        columns={columnsWithDrag}
        rows={rows}
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
            : 'calc(100dvh - var(--header-height) - 160px)',
          minHeight: isFullScreen
            ? 'calc(100vh - 130px)'
            : 'calc(100dvh - var(--header-height) - 160px)',
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
        rowHeight={64}
        columnHeaderHeight={40}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        slots={{
          toolbar: toolbar ? toolbar : GridToolbar,
          pagination: () => (
            <CustomPagination
              onPrevious={handlePrevious}
              onNext={handleNext}
              canGoNext={hasNextPage}
              canGoPrevious={hasPreviousPage}
            />
          ),
          ...slots,
        }}
        {...props}
        showToolbar
      />
    </div>
  );
};

export default TableCursor;
export { useGridApiContext, GridToolbar };
export type { GridColDef, GridRowParams, GridStateColDef };
