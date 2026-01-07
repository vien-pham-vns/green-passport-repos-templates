'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { IconFilter, IconX } from '@tabler/icons-react';

import { useFullscreenContainer } from '@/hooks/use-fullscreen-container';

/**
 * FilterPopover Layout - Composable filter popover components
 *
 * Usage:
 * <FilterPopover.Root activeCount={2}>
 *   <FilterPopover.Container title="Filters" width={500}>
 *     <FilterPopover.DateFields>
 *       <FilterPopover.DateField>{date picker}</FilterPopover.DateField>
 *     </FilterPopover.DateFields>
 *     <FilterPopover.FieldGroup>{other filters}</FilterPopover.FieldGroup>
 *   </FilterPopover.Container>
 * </FilterPopover.Root>
 */

// ============================================
// Context - Shared state for popover open/close
// ============================================

interface FilterPopoverContextValue {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const FilterPopoverContext = createContext<FilterPopoverContextValue | null>(null);

export function useFilterPopoverContext() {
  const context = useContext(FilterPopoverContext);
  if (!context) {
    throw new Error('FilterPopover components must be used within FilterPopover.Root');
  }
  return context;
}

// ============================================
// Root - Trigger button with badge
// ============================================

interface FilterPopoverRootProps {
  children: ReactNode;
  activeCount?: number;
  buttonLabel?: string;
  buttonIcon?: ReactNode;
}

function FilterPopoverRoot({
  children,
  activeCount = 0,
  buttonLabel = 'Filters',
  buttonIcon = <IconFilter />,
}: FilterPopoverRootProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FilterPopoverContext.Provider value={{ open, anchorEl, handleClose }}>
      {/* Trigger Button with Badge */}
      <Badge
        badgeContent={activeCount}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: activeCount > 0 ? 'secondary.main' : 'transparent',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.75rem',
            minWidth: '20px',
            height: '20px',
            borderRadius: '50%',
          },
        }}
        invisible={activeCount === 0}
      >
        {/* <ButtonWithIcon
          onClick={handleClick}
          label={buttonLabel}
          startIcon={buttonIcon}
          variant='outlined'
        /> */}
      </Badge>

      {/* Popover Content */}
      {children}
    </FilterPopoverContext.Provider>
  );
}

// ============================================
// Container - Popover with title and content
// ============================================

interface FilterPopoverContainerProps {
  children: ReactNode;
  title?: string;
  width?: number;
}

function FilterPopoverContainer({
  children,
  title = 'Filter',
  width = 500,
}: FilterPopoverContainerProps) {
  const { open, anchorEl, handleClose } = useFilterPopoverContext();
  const container = useFullscreenContainer();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      container={container}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      slotProps={{
        paper: {
          sx: {
            width,
            mt: 1,
            p: 2,
            borderRadius: 1,
            boxShadow: 3,
          },
        },
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography
          variant='subtitle1'
          sx={{ display: 'flex', fontWeight: 600, alignItems: 'center' }}
        >
          {title}
          <IconButton sx={{ marginLeft: 'auto' }} onClick={handleClose}>
            <IconX />
          </IconButton>
        </Typography>
      </Box>
      <Divider sx={{ width: 'calc(100% + 32px)', transform: 'translateX(-16px)' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1.5 }}>
        {children}
      </Box>
    </Popover>
  );
}

// ============================================
// DateFields - Inline date pickers container
// ============================================

interface FilterPopoverDateFieldsProps {
  children: ReactNode;
}

function FilterPopoverDateFields({ children }: FilterPopoverDateFieldsProps) {
  return <Box sx={{ display: 'flex', gap: 1.5 }}>{children}</Box>;
}

// ============================================
// DateField - Individual date field wrapper
// ============================================

interface FilterPopoverDateFieldProps {
  children: ReactNode;
}

function FilterPopoverDateField({ children }: FilterPopoverDateFieldProps) {
  return <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>;
}

// ============================================
// FieldGroup - Generic field wrapper
// ============================================

interface FilterPopoverFieldGroupProps {
  children: ReactNode;
}

function FilterPopoverFieldGroup({ children }: FilterPopoverFieldGroupProps) {
  return <Box sx={{ width: '100%' }}>{children}</Box>;
}

// ============================================
// FieldsActions - Cancel, Apply
// ============================================

interface FilterPopoverActionsProps {
  children: ReactNode;
}

function FilterPopoverActions({ children }: FilterPopoverActionsProps) {
  return (
    <>
      <Divider sx={{ width: 'calc(100% + 32px)', transform: 'translateX(-16px)' }} />
      <Box sx={{ display: 'flex', gap: 1.5, marginLeft: 'auto' }}>{children}</Box>
    </>
  );
}

export const FilterPopover = {
  Root: FilterPopoverRoot,
  Container: FilterPopoverContainer,
  DateFields: FilterPopoverDateFields,
  DateField: FilterPopoverDateField,
  FieldGroup: FilterPopoverFieldGroup,
  Actions: FilterPopoverActions,
};

export default FilterPopover;
