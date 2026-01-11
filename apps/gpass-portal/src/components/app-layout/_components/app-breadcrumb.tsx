'use client';
'use memo';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { useTranslations } from '@/providers/translation-provider/client';

import { getBreadcrumbs } from '../_libs/breadcrumb.config';

const baseTextStyles = {
  fontSize: 14,
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
};

export const AppBreadcrumb = () => {
  const t = useTranslations('app-layout');
  const pathname = usePathname();

  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', maxHeight: '40px' }}>
      <Breadcrumbs
        aria-label='breadcrumb'
        separator='/'
        sx={{
          '& .MuiBreadcrumbs-separator': {
            mx: 1,
            color: (theme) => `${theme.palette.brand[500]}`,
            ...baseTextStyles,
          },
        }}
      >
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const hasHref = Boolean(item.href);

          if (isLast || !hasHref) {
            return (
              <Box
                key={index}
                component='span'
                sx={{
                  ...baseTextStyles,
                  color: (theme) => `${theme.palette.info}`,
                  fontWeight: 500,
                }}
              >
                {t(item.labelKey)}
              </Box>
            );
          }

          return (
            <Box
              key={index}
              component={NextLink}
              href={(item.href ? item.href : '#') as any}
              sx={{
                ...baseTextStyles,
                color: (theme) => `${theme.palette.brand[500]}`,
                textDecoration: 'none',
                '&:hover': {
                  color: 'var(--brand-500)',
                  textDecoration: 'underline',
                },
              }}
            >
              {t(item.labelKey)}
            </Box>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};
