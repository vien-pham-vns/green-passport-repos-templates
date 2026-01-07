import { FC } from 'react';

import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material/styles';

export const CustomSortIcon: FC<SvgIconProps & { asc?: boolean; desc?: boolean }> = ({ asc, desc, ...restProps }) => {
  const theme = useTheme();

  return (
    <SvgIcon {...restProps} sx={{ width: 22, height: 22 }}>
      <path
        d='M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9z'
        fill={asc ? theme.palette.primary.main : theme.palette.grey[500]}
        transform='scale(0.9) translate(3, 1)'
      />
      <path
        d='M12 18.17L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15z'
        fill={desc ? theme.palette.primary.main : theme.palette.grey[500]}
        transform='scale(0.9) translate(3, -1)'
      />
    </SvgIcon>
  );
};
