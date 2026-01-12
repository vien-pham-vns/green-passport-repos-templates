import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      sx={{ minHeight: '40px', display: 'flex', alignItems: 'center' }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast || !item.href) {
          return (
            <Typography key={index} color='text.primary'>
              {item.label}
            </Typography>
          );
        }

        return (
          <Link
            key={index}
            href={item.href}
            sx={{
              color: 'var(--brand-500)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            <Typography>{item.label}</Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
