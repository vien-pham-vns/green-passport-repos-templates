'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { formatNumber } from 'utils/number';

import { ActionsColumn } from '@/components/table/columns';
import { withEmptyRender } from '@/components/table/utils';
import useFormatDate from '@/hooks/use-format-date';
import { useTranslations } from '@/providers/translation-provider/client';

import { ApplicationItem } from '../type';

export function useColumns() {
  const commonT = useTranslations('common');
  const t = useTranslations('harvest-record-page');
  const { formatDate } = useFormatDate();
  const router = useRouter();

  const columns = useMemo(
    () =>
      withEmptyRender<ApplicationItem>([
        {
          field: 'batchlot',
          headerName: t('batch-lot-id'),
          width: 180,
          sortable: false,
          hideable: false,
        },
        {
          field: 'totalWeight',
          headerName: t('weight-kg'),
          width: 140,
          align: 'right',
          renderCell: ({ row }) => formatNumber(row.totalWeight),
        },
        {
          field: 'dateCreated',
          headerName: t('harvest-date'),
          flex: 1,
          align: 'center',
          renderCell: ({ row }) => formatDate(row.dateCreated),
          sortComparator: ({ row }) => {
            const dateA = new Date(row.dateCreated).getTime();
            const dateB = new Date(row.dateCreated).getTime();
            return dateA - dateB;
          },
        },

        {
          field: 'actions',
          headerName: commonT('actions'),
          headerAlign: 'center',
          align: 'center',
          width: 160,
          sortable: false,
          resizable: false,
          hideable: false,
          renderCell: ({ row }) => (
            <ActionsColumn>
              <ActionsColumn.View action={() => router.push(`#`)} />
            </ActionsColumn>
          ),
        },
      ]),
    [formatDate, t, commonT, router]
  );

  return {
    columns,
  };
}
