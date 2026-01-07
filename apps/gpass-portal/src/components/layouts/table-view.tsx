import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface TableViewContextValue {
  isLoading?: boolean;
  setIsLoading: (loading: boolean) => void;
  variant?: 'default' | 'compact' | 'spacious';
  showDividers?: boolean;
}

interface TableViewRootProps {
  children: ReactNode;
  variant?: 'default' | 'compact' | 'spacious';
  showDividers?: boolean;
  defaultLoading?: boolean;
  ref?: React.RefObject<HTMLElement | null>;
}

interface TableViewHeaderProps {
  children: ReactNode;
  asChild?: boolean;
}

interface TableViewActionsProps {
  children: ReactNode;
  asChild?: boolean;
}

interface TableViewTitleProps {
  children: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  asChild?: boolean;
}

interface TableViewContentProps {
  children: ReactNode;
  asChild?: boolean;
}

interface TableViewFiltersProps {
  children: ReactNode;
  asChild?: boolean;
}

interface TableViewTableProps {
  children: ReactNode;
  asChild?: boolean;
  minHeight?: string | number;
  maxHeight?: string | number;
  height?: string | number;
}

const TableViewContext = createContext<TableViewContextValue | null>(null);

const useTableViewContext = () => {
  const context = useContext(TableViewContext);
  if (!context) {
    throw new Error('TableView components must be used within TableView.Root');
  }
  return context;
};

function TableViewRoot({
  children,
  variant = 'default',
  showDividers = false,
  defaultLoading = false,
  ref,
}: TableViewRootProps) {
  const [isLoading, setIsLoading] = useState(defaultLoading);

  const contextValue: TableViewContextValue = {
    isLoading,
    setIsLoading,
    variant,
    showDividers,
  };

  return (
    <TableViewContext.Provider value={contextValue}>
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          ...(variant === 'compact' && { gap: 1 }),
          ...(variant === 'spacious' && { gap: 3 }),
          ...(variant === 'default' && { gap: 2 }),
        }}
      >
        {children}
      </Box>
    </TableViewContext.Provider>
  );
}

function TableViewHeader({ children, asChild = false }: TableViewHeaderProps) {
  const { showDividers } = useTableViewContext();

  if (asChild) {
    return <>{children}</>;
  }

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{
        ...(showDividers && {
          borderBottom: 1,
          borderColor: 'divider',
          pb: 2,
        }),
      }}
    >
      {children}
    </Stack>
  );
}

function TableViewActions({ children, asChild = false }: TableViewActionsProps) {
  if (asChild) {
    return <>{children}</>;
  }

  return (
    <Stack direction='row' spacing={1}>
      {children}
    </Stack>
  );
}

function TableViewTitle({
  children,
  showBackButton = false,
  onBack,
  asChild = false,
}: TableViewTitleProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  if (asChild) {
    return <>{children}</>;
  }

  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      {showBackButton && (
        <ArrowBack
          style={{ width: 24, height: 24, cursor: 'pointer' }}
          onClick={handleBack}
        />
      )}
      <Typography variant='h6' component='h1'>
        {children}
      </Typography>
    </Stack>
  );
}

function TableViewContent({ children, asChild = false }: TableViewContentProps) {
  const { variant } = useTableViewContext();

  if (asChild) {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        background: 'white',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        ...(variant === 'compact' && { p: 1 }),
        ...(variant === 'spacious' && { p: 3 }),
        ...(variant === 'default' && { p: 2 }),
      }}
    >
      {children}
    </Box>
  );
}

function TableViewFilters({ children, asChild = false }: TableViewFiltersProps) {
  if (asChild) {
    return <>{children}</>;
  }

  return (
    <Stack direction='row' spacing={2} my={2} flexWrap='wrap'>
      {children}
    </Stack>
  );
}

function TableViewTable({
  children,
  asChild = false,
  minHeight,
  maxHeight,
  height,
}: TableViewTableProps) {
  if (asChild) {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        mt: 2,
        minHeight,
        maxHeight,
        height,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      {children}
    </Box>
  );
}

export const TableView = Object.assign(TableViewRoot, {
  Root: TableViewRoot,
  Header: TableViewHeader,
  Actions: TableViewActions,
  Title: TableViewTitle,
  Content: TableViewContent,
  Filters: TableViewFilters,
  Table: TableViewTable,
});

export { useTableViewContext };
