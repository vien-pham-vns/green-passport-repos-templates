'use client';

import { useEffect, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Popover, { PopoverProps } from '@mui/material/Popover';
import { GridStateColDef } from '@mui/x-data-grid/internals';
import { omit } from 'es-toolkit/compat';

import { useFullscreenContainer } from '@/hooks/use-fullscreen-container';

import { useGridApiContext } from '..';

export type SettingProps = {
  anchorEl: Element | null;
  onClose: (visibleColumns: GridStateColDef[]) => void;
} & Omit<PopoverProps, 'open' | 'onClose'>;

const Setting = ({ anchorEl, onClose, ...props }: SettingProps) => {
  const gridAPI = useGridApiContext()?.current;

  const container = useFullscreenContainer();

  const [visibleColumns, setVisibleColumns] = useState<GridStateColDef[]>(
    gridAPI.getVisibleColumns()
  );

  useEffect(() => {
    const unsubscribe = gridAPI.subscribeEvent('columnVisibilityModelChange', () => {
      setVisibleColumns(gridAPI.getVisibleColumns());
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => onClose(visibleColumns)}
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
            p: 2,
            minWidth: 200,
            mt: 1,
            borderRadius: 2,
            boxShadow: 3,
          },
        },
      }}
      {...omit(props, ['open'])}
    >
      <div className={'flex flex-col'}>
        {gridAPI.getAllColumns().map((col) => {
          const isVisible = !!visibleColumns.find(
            (visibleCol) => col.field === visibleCol.field
          );
          const isHidable = col.hideable !== false; // Default is true, disable only when explicitly set to false

          return (
            <FormControlLabel
              key={col.field}
              control={
                <Checkbox
                  checked={isVisible}
                  disabled={!isHidable}
                  onChange={() => {
                    if (isHidable) {
                      gridAPI.setColumnVisibility(col.field, !isVisible);
                    }
                  }}
                  sx={{
                    fontSize: '0.875rem',
                    color: 'primary.light',
                  }}
                />
              }
              label={col.headerName}
              sx={{
                opacity: isHidable ? 1 : 0.5,
              }}
            />
          );
        })}
      </div>
    </Popover>
  );
};

export default Setting;
