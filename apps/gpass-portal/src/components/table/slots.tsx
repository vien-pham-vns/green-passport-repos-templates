'use client';

import { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { GridFooterContainer } from '@mui/x-data-grid';

export const PaginationSlot = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color='primary'
      variant='outlined'
      shape='rounded'
      page={page + 1}
      count={pageCount}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
};

type SelectionSlotProps = {
  rowCount: number;
  actions: ReactNode[];
};

export const SelectionSlot: FC<SelectionSlotProps> = (props) => {
  const { rowCount, actions } = props;

  if (!rowCount) return <div />;

  return (
    <Box sx={{ px: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <div>Total Rows: {rowCount}</div>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{actions}</Box>
    </Box>
  );
};

type FooterSlotProps = SelectionSlotProps;

export const FooterSlot: FC<FooterSlotProps> = (props) => {
  const { rowCount, actions } = props;

  return (
    <GridFooterContainer>
      <SelectionSlot rowCount={rowCount} actions={actions} />
      <PaginationSlot />
    </GridFooterContainer>
  );
};
