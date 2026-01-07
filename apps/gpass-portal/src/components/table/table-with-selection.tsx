'use client';

import { ComponentProps, ComponentType, FC, useState } from 'react';

import {
  DataGridProps,
  GridPaginationModel,
  GridRowSelectionModel,
} from '@mui/x-data-grid';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constant/common';

import Table from '.';
import { FooterSlot } from './slots';

export const useTableWithSelection = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: DEFAULT_PAGE,
    pageSize: Number(DEFAULT_PAGE_SIZE),
  });
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set([]),
  });

  const goToPage = (nextPage: number) => {
    setPaginationModel((prev) => ({ ...prev, page: nextPage }));
  };

  return {
    paginationModel,
    goToPage,
    selectedRows,
    setSelectedRows,
  };
};

type WithSelectionProps = DataGridProps &
  ReturnType<typeof useTableWithSelection> & {
    footerActions: ComponentProps<typeof FooterSlot>['actions'];
  };

export const withSelection = <T extends WithSelectionProps>(
  DataGrid: ComponentType<T>
) => {
  const DataGridWithSelection: FC<T> = (props) => {
    const {
      paginationModel,
      goToPage,
      selectedRows,
      setSelectedRows,
      footerActions,
      rows = [],
      slots,
      slotProps,
      ...rest
    } = props;

    return (
      <DataGrid
        {...(rest as T)}
        checkboxSelection={true}
        disableRowSelectionOnClick={true}
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedRows(newRowSelectionModel);
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => goToPage(model.page)}
        rows={rows}
        slots={{
          footer: FooterSlot,
          ...slots,
        }}
        slotProps={{
          footer: {
            rowCount: selectedRows.ids.size,
            actions: footerActions,
          },
          ...slotProps,
        }}
      />
    );
  };

  return DataGridWithSelection;
};

export const TableWithSelection = withSelection(Table);
