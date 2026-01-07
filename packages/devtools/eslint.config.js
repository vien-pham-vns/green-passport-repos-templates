import { config } from "@dt/eslint-config/react-internal";

export default [
  ...config,
  {
    rules: {
      // Enforce specific path imports for MUI components (better tree-shaking)
      // Example: import Button from '@mui/material/Button' instead of import { Button } from '@mui/material'
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@mui/material",
              message:
                "Import from specific paths instead (e.g., '@mui/material/Button') for better tree-shaking.",
            },
            {
              name: "@mui/icons-material",
              message:
                "Import from specific paths instead (e.g., '@mui/icons-material/CheckCircle') for better tree-shaking.",
            },
          ],
        },
      ],
    },
  },
];
