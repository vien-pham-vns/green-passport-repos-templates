import { useMemo, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

export const useDragColumns = <T extends GridValidRowModel>(
  initColumns: GridColDef<T>[]
) => {
  const [columns, setColumns] = useState<GridColDef<T>[]>(initColumns);
  const draggedColumn = useRef<string | null>(null);

  const handleDragStart = (field: string): void => {
    draggedColumn.current = field;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (targetField: string): void => {
    if (!draggedColumn.current || draggedColumn.current === targetField) {
      return;
    }
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const draggedIdx = newColumns.findIndex(
        (col) => col.field === draggedColumn.current
      );
      const targetIdx = newColumns.findIndex((col) => col.field === targetField);

      // const [draggedCol] = newColumns.splice(draggedIdx, 1);
      newColumns.splice(targetIdx, 0);

      return newColumns;
    });

    draggedColumn.current = null;
  };

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const columnsWithDrag = useMemo<GridColDef<T>[]>(() => {
    return columns.map((col) => ({
      ...col,
      renderHeader: () => (
        <Box
          sx={{
            cursor: 'move',
            width: '100%',
            height: '100%',
            textAlign: col?.headerAlign,
            alignContent: 'center',
          }}
          draggable
          onDragStart={() => handleDragStart(col.field)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(col.field)}
        >
          {col.headerName}
        </Box>
      ),
    }));
  }, [columns]);

  return { columns: columnsWithDrag };
};
