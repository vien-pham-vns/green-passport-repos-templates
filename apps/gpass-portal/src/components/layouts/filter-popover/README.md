# FilterPopover Layout

A composable, reusable filter popover layout component for creating consistent filter UIs across pages.

## Features

- ✨ **Composable Pattern**: Similar to TableView layout - easy to compose and customize
- 🎯 **Consistent Styling**: Unified popover styling across the app
- 📱 **Responsive**: Configurable width and layout
- 🔢 **Active Count Badge**: Automatic badge on button showing active filter count
- 🎨 **Customizable**: Override any part while keeping consistency

## Components

### FilterPopover.Root
The root wrapper that provides context and button with badge.

**Props:**
- `activeCount?: number` - Number of active filters (shows in badge)
- `buttonLabel?: string` - Button text (default: "Filters")
- `buttonIcon?: ReactNode` - Button icon (default: filter icon)
- `children: ReactNode` - The FilterPopover.Container

### FilterPopover.Container
The popover container with title and content area.

**Props:**
- `title?: string` - Popover title (default: "Filter")
- `width?: number` - Popover width in pixels (default: 500)
- `children: ReactNode` - Filter fields content

### FilterPopover.DateFields
Wrapper for inline date pickers (displays them side by side).

### FilterPopover.DateField
Individual date field wrapper (flex: 1).

### FilterPopover.FieldGroup
Generic field group wrapper for other filter types.

## Usage Example

```tsx
import { FilterPopover } from 'components/Layouts/filter-popover';
import { DatePicker } from 'components/form/DatePicker';
import { FormControl, FormLabel, Box } from '@mui/material';

export const MyFilter = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const activeCount = [filters.status, filters.category].filter(Boolean).length;

  return (
    <FilterPopover.Root activeCount={activeCount} buttonLabel="Filters">
      <FilterPopover.Container title="Filter Options" width={500}>

        {/* Inline Date Pickers */}
        <FilterPopover.DateFields>
          <FilterPopover.DateField>
            <DatePicker
              filterInputLabel
              label="Start Date"
              value={filters.fromDate}
              onChange={(value) => handleFilterChange('fromDate', value)}
              slotProps={{
                textField: { sx: { width: '100%' } },
                field: { clearable: true, readOnly: true },
              }}
            />
          </FilterPopover.DateField>

          <FilterPopover.DateField>
            <DatePicker
              filterInputLabel
              label="End Date"
              value={filters.toDate}
              onChange={(value) => handleFilterChange('toDate', value)}
              slotProps={{
                textField: { sx: { width: '100%' } },
                field: { clearable: true, readOnly: true },
              }}
            />
          </FilterPopover.DateField>
        </FilterPopover.DateFields>

        {/* Other Filter Fields */}
        <FilterPopover.FieldGroup>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Status</FormLabel>
            {/* Your status filter UI */}
          </FormControl>
        </FilterPopover.FieldGroup>

      </FilterPopover.Container>
    </FilterPopover.Root>
  );
};
```

## Complete Example

See [FeedbackFilter.tsx](../../../app/(main)/consumer-feedback/_components/FeedbackFilter.tsx) for a complete implementation with:
- Inline date pickers
- Radio button cards with corner badges
- Multiple filter field types
- Active filter count

## Styling

The layout provides consistent styling:
- Popover: `padding: 2`, `borderRadius: 2`, `boxShadow: 3`
- Title: variant="h6", fontWeight: 600
- Fields: `gap: 2` between fields
- Date fields: `gap: 1.5` between inline pickers

All can be overridden via sx prop or by wrapping with custom Box components.

## Best Practices

1. **Active Count**: Calculate based on actual filter values, exclude date filters if they're always set
2. **Date Pickers**: Use `filterInputLabel` prop and `readOnly: true` on field slot
3. **Field Groups**: Wrap each filter type in `FilterPopover.FieldGroup` for consistent spacing
4. **Width**: Use 500px for filters with multiple fields, 400px for simple filters

## Migration from Old FilterPopover

**Before:**
```tsx
<FilterPopover
  filters={filters}
  onFiltersChange={onFiltersChange}
  fields={FILTER_FIELDS}
  excludeFromCount={['fromDate', 'toDate']}
/>
```

**After:**
```tsx
<FilterPopover.Root activeCount={activeCount}>
  <FilterPopover.Container>
    {/* Build your custom filter UI */}
  </FilterPopover.Container>
</FilterPopover.Root>
```

The new approach gives you full control over the filter UI while maintaining consistency!
