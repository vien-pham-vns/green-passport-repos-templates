export type BreadcrumbItem = {
  labelKey: string;
  href?: string;
};

type BreadcrumbTrail = BreadcrumbItem[];

export const breadcrumbConfig: Record<string, BreadcrumbTrail> = {
  ['/portal']: [
    { labelKey: 'menu-portal', href: '/portal' },
    { labelKey: 'menu-portal' },
  ],
  '/portal/*': [
    { labelKey: 'menu-portal', href: '/portal' },
    { labelKey: 'menu-portal', href: '/portal' },
    { labelKey: 'portal-detail' },
  ],
};

export const getBreadcrumbs = (pathname: string): BreadcrumbTrail => {
  // Exact match
  if (breadcrumbConfig[pathname]) {
    return breadcrumbConfig[pathname];
  }

  // Pattern match for dynamic routes (e.g., /users/* matches /users/123)
  for (const [pattern, trail] of Object.entries(breadcrumbConfig)) {
    if (pattern.endsWith('/*')) {
      const prefix = pattern.slice(0, -2); // Remove /*
      if (pathname.startsWith(prefix + '/')) {
        return trail;
      }
    }
  }

  // Fallback to dashboard
  return [{ labelKey: 'menu-dashboard' }];
};
