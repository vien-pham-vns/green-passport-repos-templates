'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

interface LanguageStatsProps {
  language: string;
  stats: {
    total: number;
    translated: number;
    missing: number;
    percentage: number;
  };
}

export default function LanguageStats({ language, stats }: LanguageStatsProps) {
  const isComplete = stats.percentage === 100;

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isComplete ? (
              <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
            ) : (
              <WarningIcon sx={{ color: 'warning.main', fontSize: 20 }} />
            )}
            <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
              {language}
            </Typography>
          </Box>
          <Typography variant="h6" fontWeight={600} color={isComplete ? 'success.main' : 'text.primary'}>
            {stats.percentage}%
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={stats.percentage}
          sx={{
            mb: 2,
            height: 6,
            borderRadius: 3,
            bgcolor: 'action.hover',
            '& .MuiLinearProgress-bar': {
              bgcolor: isComplete ? 'success.main' : 'primary.main',
              borderRadius: 3,
            },
          }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Total
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {stats.total}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Done
            </Typography>
            <Typography variant="body2" fontWeight={600} color="success.main">
              {stats.translated}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Missing
            </Typography>
            <Typography variant="body2" fontWeight={600} color="error.main">
              {stats.missing}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
