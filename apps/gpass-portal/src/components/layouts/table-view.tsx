'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/**
 * Simple type-safe compound component for table views
 * Based on: https://tkdodo.eu/blog/building-type-safe-compound-components
 *
 * Basic Usage:
 * ```tsx
 * <TableView variant="default">
 *   <TableView.Header>
 *     <TableView.Title>Products</TableView.Title>
 *     <TableView.Actions><Button>Add</Button></TableView.Actions>
 *   </TableView.Header>
 *   <TableView.Content>
 *     <TableView.Table><DataGrid /></TableView.Table>
 *   </TableView.Content>
 * </TableView>
 * ```
 *
 * Type-Safe Usage:
 * ```tsx
 * const { TableView } = createTableView<ProductRow>();
 * <TableView data={products} onRowClick={(row) => console.log(row.id)}>
 *   ...
 * </TableView>
 * ```
 */

// ============================================================================
// Types
// ============================================================================

type TableViewVariant = 'default' | 'compact' | 'spacious';

interface TableViewRootProps<TData = unknown> {
  children: ReactNode;
  variant?: TableViewVariant;
  showDividers?: boolean;
  data?: TData[];
  onRowClick?: (row: TData) => void;
  ref?: React.RefObject<HTMLElement | null>;
}

interface TableViewHeaderProps {
  children: ReactNode;
}

interface TableViewActionsProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface TableViewTitleProps {
  children: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  subtitle?: string;
}

interface TableViewContentProps {
  children: ReactNode;
  fullHeight?: boolean;
}

interface TableViewFiltersProps {
  children: ReactNode;
  direction?: 'row' | 'column';
}

interface TableViewTableProps {
  children: ReactNode;
  minHeight?: string | number;
  maxHeight?: string | number;
  height?: string | number;
  autoHeight?: boolean;
}

interface TableViewFooterProps {
  children: ReactNode;
}

// ============================================================================
// Factory Function (Type-Safe Pattern)
// ============================================================================

/**
 * Creates a type-safe TableView for a specific data type
 * @template TData - Type of data rows (e.g., Product, User)
 */
function createTableView<TData = never>() {
  function TableViewRoot({
    children,
    variant = 'default',
    showDividers = false,
    data: _data,
    onRowClick: _onRowClick,
    ref,
  }: TableViewRootProps<TData>) {
    const getGap = () => {
      if (variant === 'compact') return 1;
      if (variant === 'spacious') return 3;
      return 2;
    };

    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: getGap(),
        }}
        data-variant={variant}
        data-dividers={showDividers}
      >
        {children}
      </Box>
    );
  }

  function TableViewHeader({ children }: TableViewHeaderProps) {
    return (
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {children}
      </Stack>
    );
  }

  function TableViewActions({ children, align = 'right' }: TableViewActionsProps) {
    return (
      <Stack
        direction='row'
        spacing={1}
        sx={{
          justifyContent:
            align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end',
        }}
      >
        {children}
      </Stack>
    );
  }

  function TableViewTitle({
    children,
    showBackButton = false,
    onBack,
    subtitle,
  }: TableViewTitleProps) {
    const router = useRouter();

    const handleBack = () => {
      if (onBack) {
        onBack();
      } else {
        router.back();
      }
    };

    return (
      <Stack direction='row' alignItems='center' spacing={1}>
        {showBackButton && (
          <ArrowBack
            sx={{
              width: 24,
              height: 24,
              cursor: 'pointer',
              '&:hover': { opacity: 0.7 },
            }}
            onClick={handleBack}
          />
        )}
        <Box>
          <Typography variant='h6' component='h1'>
            {children}
          </Typography>
          {subtitle && (
            <Typography variant='body2' color='text.secondary'>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>
    );
  }

  function TableViewContent({ children, fullHeight = false }: TableViewContentProps) {
    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          ...(fullHeight && { flex: 1, height: '100%' }),
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>
    );
  }

  function TableViewFilters({ children, direction = 'row' }: TableViewFiltersProps) {
    return (
      <Stack
        direction={direction}
        spacing={2}
        my={2}
        sx={{
          flexWrap: direction === 'row' ? 'wrap' : 'nowrap',
          alignItems: direction === 'row' ? 'center' : 'stretch',
        }}
      >
        {children}
      </Stack>
    );
  }

  function TableViewTable({
    children,
    minHeight,
    maxHeight,
    height,
    autoHeight = false,
  }: TableViewTableProps) {
    return (
      <Box
        sx={{
          mt: 2,
          ...(autoHeight ? {} : { minHeight, maxHeight, height }),
          display: 'flex',
          flexDirection: 'column',
          ...(autoHeight ? {} : { flex: 1 }),
          overflowX: 'auto',
          overflowY: autoHeight ? 'visible' : 'auto',
        }}
      >
        {children}
      </Box>
    );
  }

  function TableViewFooter({ children }: TableViewFooterProps) {
    return (
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          mt: 2,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        {children}
      </Stack>
    );
  }

  // Compose compound component
  const TableView = Object.assign(TableViewRoot, {
    Header: TableViewHeader,
    Actions: TableViewActions,
    Title: TableViewTitle,
    Content: TableViewContent,
    Filters: TableViewFilters,
    Table: TableViewTable,
    Footer: TableViewFooter,
  });

  return { TableView };
}

// ============================================================================
// Default Export (Non-typed version)
// ============================================================================

const { TableView } = createTableView();

export { TableView, createTableView };
export type {
  TableViewVariant,
  TableViewRootProps,
  TableViewHeaderProps,
  TableViewActionsProps,
  TableViewTitleProps,
  TableViewContentProps,
  TableViewFiltersProps,
  TableViewTableProps,
  TableViewFooterProps,
};
