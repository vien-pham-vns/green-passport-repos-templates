import React from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { IconCheck, IconX } from '@tabler/icons-react';

interface PasswordCriteria {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

interface PasswordValidationProps {
  password: string;
  criteria: PasswordCriteria[];
  showStrengthBadge?: boolean;
  width?: string | number;
}

const PasswordValidation: React.FC<PasswordValidationProps> = ({
  password,
  criteria,
  showStrengthBadge = true,
  width,
}) => {
  const theme = useTheme();

  const getPasswordStrength = (
    pwd: string
  ): {
    score: number;
  } => {
    const passedCriteria = criteria.filter((criterion) => criterion.test(pwd));
    const score = passedCriteria.length;
    const total = criteria.length;

    if (score === 0) {
      return { score: 0 };
    } else if (score < total) {
      return { score };
    } else {
      return { score };
    }
  };

  const { score } = getPasswordStrength(password);

  const getChipColor = (scoreNum: number) => {
    if (scoreNum === 1) return theme.palette.error.main;
    if (scoreNum === 2 || scoreNum === 3) return theme.palette.warning.main;
    if (scoreNum === 4) return '#FDE047'; // Yellow
    if (scoreNum === 5) return theme.palette.success.main;
    return theme.palette.grey[300];
  };

  const strengthLevels = [
    {
      id: 'chip-1',
      index: 0,
      shouldColor: score >= 1,
    },
    {
      id: 'chip-2',
      index: 1,
      shouldColor: score >= 2,
    },
    {
      id: 'chip-3',
      index: 2,
      shouldColor: score >= 4,
    },
    {
      id: 'chip-4',
      index: 3,
      shouldColor: score >= 5,
    },
  ];

  return (
    <Box sx={{ mt: 1 }}>
      {showStrengthBadge && (
        <Box sx={{ mb: 1 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              width: width || 'fit-content',
            }}
          >
            {strengthLevels.map((level) => {
              const chipColor = level.shouldColor
                ? getChipColor(score)
                : theme.palette.grey[300];

              return (
                <Chip
                  key={level.id}
                  size='small'
                  sx={{
                    height: 4,
                    flex: 1,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    backgroundColor: chipColor,
                    opacity: 1,
                    transition: 'all 0.3s ease-in-out',
                  }}
                />
              );
            })}
          </Box>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {criteria.map((criterion) => {
          const isValid = criterion.test(password);
          const showIcon = score > 0;
          const iconColor = isValid
            ? theme.palette.success.main
            : theme.palette.error.main;
          const textColor = isValid
            ? theme.palette.success.main
            : theme.palette.text.secondary;

          return (
            <Box
              key={criterion.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <Typography
                variant='body2'
                sx={{
                  color: textColor,
                  fontWeight: isValid ? 500 : 400,
                  transition: 'color 0.2s ease-in-out',
                }}
              >
                {criterion.label}
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  height: '0.5px',
                  backgroundColor: theme.palette.grey[200],
                  mx: 1,
                }}
              />
              {showIcon && (
                <Box>
                  {isValid ? (
                    <IconCheck size={16} color={iconColor} />
                  ) : (
                    <IconX size={16} color={iconColor} />
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PasswordValidation;
