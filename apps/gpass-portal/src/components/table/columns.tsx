'use client';

import { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import { IconDetails, IconEditCircleOff, IconEye } from '@tabler/icons-react';

import { useTranslations } from '@/providers/translation-provider/client';

type Props = {
  children: ReactNode;
};

export const ActionsColumn: FC<Props> & {
  View: typeof ViewAction;
  Edit: typeof EditAction;
  Review: typeof ReviewAction;
} = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        gap: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </Box>
  );
};

type ActionProps = Omit<ButtonProps, 'onClick' | 'children'> & {
  action?: () => void;
  buttonTitle?: string;
};

const ViewAction: FC<ActionProps> = ({ action, buttonTitle, ...buttonProps }) => {
  const commonT = useTranslations('common');
  return (
    <Button
      variant='text'
      size='small'
      onClick={() => action?.()}
      startIcon={<IconDetails />}
    >
      {buttonTitle || commonT('view')}
    </Button>
  );
};

const EditAction: FC<ActionProps> = ({ action, buttonTitle, ...buttonProps }) => {
  const commonT = useTranslations('common');
  return (
    <Button
      variant='text'
      size='small'
      onClick={() => action?.()}
      startIcon={<IconEditCircleOff size={18} />}
    >
      {buttonTitle || commonT('edit')}
    </Button>
  );
};

const ReviewAction: FC<ActionProps> = ({ action, buttonTitle, ...buttonProps }) => {
  const commonT = useTranslations('common');
  return (
    <Button
      variant='text'
      size='small'
      onClick={() => action?.()}
      startIcon={<IconEye size={18} />}
    >
      {buttonTitle || commonT('review')}
    </Button>
  );
};

ActionsColumn.View = ViewAction;
ActionsColumn.Edit = EditAction;
ActionsColumn.Review = ReviewAction;
