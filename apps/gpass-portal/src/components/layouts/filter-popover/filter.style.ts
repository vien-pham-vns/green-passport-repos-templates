import { SxProps, Theme } from '@mui/material/styles';

export const createRatingBoxStyle = (isSelected: boolean): SxProps<Theme> => ({
  position: 'relative',
  flex: '1 1 auto',
  height: '48px',
  width: '78px !important',
  padding: 0,
  margin: 0,
  aspectRatio: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid',
  borderColor: isSelected ? 'primary.main' : 'divider',
  borderRadius: 1,
  gap: 0.3,
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: isSelected ? 600 : 400,
  transition: 'all 0.2s ease-in-out',
  overflow: 'hidden',
  '&:hover': {
    borderColor: isSelected ? 'primary.main' : 'action.hover',
    backgroundColor: isSelected ? 'primary.100' : 'action.hover',
  },
  '&::before': isSelected
    ? {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        color: 'primary.main',
        borderLeft: '26px solid',
        borderBottom: '26px solid transparent',
        zIndex: 1,
      }
    : {},
});

export const checkIconStyle: SxProps<Theme> = {
  position: 'absolute',
  top: 1,
  left: 1,
  fontSize: '0.875rem',
  color: 'white',
  zIndex: 2,
};

export const selectButtonStyle = (isSelected: boolean): SxProps<Theme> => ({
  flex: 1,
  height: '48px',
  borderRadius: 1,
  fontWeight: 400,
  backgroundColor: isSelected ? '' : 'white',
  borderColor: isSelected ? 'primary.main' : 'grey.300',
  color: isSelected ? 'primary.main' : 'grey.900',
  borderLeft: isSelected ? '10px solid' : '1px solid',
  borderLeftColor: isSelected ? 'primary.main' : 'grey.300',
  paddingLeft: isSelected ? '14px' : '16px',
});
