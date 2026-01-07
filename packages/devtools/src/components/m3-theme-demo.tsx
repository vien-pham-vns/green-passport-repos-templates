'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import { shapeTokens, elevationTokens } from '@dt/mui-ui';

/**
 * Material Design 3 Theme Demo Component
 *
 * Demonstrates the M3 design system integration including:
 * - Typography scale (Display, Headline, Title, Body, Label)
 * - Shape tokens (none, extraSmall, small, medium, large, extraLarge, full)
 * - Component styling (buttons, cards, chips, text fields)
 * - Elevation system
 * - Color palette
 */
export default function M3ThemeDemo() {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Material Design 3 Theme Demo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Showcasing the M3 design system integrated into @dt/mui-ui
        </Typography>
      </Box>

      {/* Typography Scale */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Typography Scale
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="caption" display="block" color="text.secondary" gutterBottom>
              DISPLAY STYLES
            </Typography>
            <Typography variant="h1" gutterBottom>
              Display Large
            </Typography>
            <Typography variant="h2" gutterBottom>
              Display Medium
            </Typography>
            <Typography variant="h3" gutterBottom>
              Display Small
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="caption" display="block" color="text.secondary" gutterBottom>
              HEADLINE STYLES
            </Typography>
            <Typography variant="h4" gutterBottom>
              Headline Medium
            </Typography>
            <Typography variant="h5" gutterBottom>
              Headline Small
            </Typography>
            <Typography variant="h6" gutterBottom>
              Title Large
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="caption" display="block" color="text.secondary" gutterBottom>
              TITLE & BODY STYLES
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Title Medium - 16px, weight 500
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Title Small - 14px, weight 500
            </Typography>
            <Typography variant="body1" gutterBottom>
              Body Large - 16px, weight 400
            </Typography>
            <Typography variant="body2" gutterBottom>
              Body Medium - 14px, weight 400
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Body Small - 12px, weight 400
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Buttons */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Buttons (M3 Pill Shape)
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Button variant="contained">Contained</Button>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Button variant="outlined">Outlined</Button>
          <Button variant="outlined" color="error">
            Error
          </Button>
          <Button variant="outlined" disabled>
            Disabled
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Button variant="text">Text</Button>
          <Button variant="text" color="success">
            Success
          </Button>
          <Button variant="text" disabled>
            Disabled
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" startIcon={<DownloadIcon />}>
            Large Button
          </Button>
          <Button variant="outlined" size="small">
            Small Button
          </Button>
          <IconButton color="primary">
            <FavoriteIcon />
          </IconButton>
          <IconButton color="secondary">
            <ShareIcon />
          </IconButton>
        </Box>
      </Paper>

      {/* Chips */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Chips (M3 Small Shape - 8px)
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Default" />
          <Chip label="Primary" color="primary" />
          <Chip label="Secondary" color="secondary" />
          <Chip label="Success" color="success" />
          <Chip label="Error" color="error" />
          <Chip label="Warning" color="warning" />
          <Chip label="Info" color="info" />
          <Chip label="Outlined" variant="outlined" />
          <Chip label="Clickable" onClick={() => {}} />
          <Chip label="Deletable" onDelete={() => {}} />
        </Box>
      </Paper>

      {/* Cards */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Cards (M3 Medium Shape - 12px, Outlined)
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Card Title
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  M3 cards use outlined variant by default with 12px border radius.
                </Typography>
                <LinearProgress variant="determinate" value={75} sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" variant="contained">
                    Action
                  </Button>
                  <Button size="small" variant="outlined">
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Colored Card
                </Typography>
                <Typography variant="body2" paragraph>
                  Cards can be customized with theme colors while maintaining M3 shape.
                </Typography>
                <Chip label="Featured" size="small" sx={{ bgcolor: 'background.paper' }} />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  STATISTICS
                </Typography>
                <Typography variant="h4" gutterBottom fontWeight={600}>
                  1,234
                </Typography>
                <Typography variant="body2" color="success.main">
                  +12.5% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Form Fields */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Form Fields (M3 Medium Shape - 12px)
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Text Field"
              placeholder="Enter text..."
              fullWidth
              helperText="Helper text"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@example.com"
              fullWidth
              error
              helperText="Invalid email address"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Select Option</InputLabel>
              <Select label="Select Option" defaultValue="">
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Multiline"
              multiline
              rows={4}
              fullWidth
              placeholder="Enter description..."
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Shape Tokens */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          M3 Shape Tokens
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          {Object.entries(shapeTokens).map(([name, value]) => (
            <Grid key={name} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  borderRadius: `${value}px`,
                  textAlign: 'center',
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  {name}
                </Typography>
                <Typography variant="caption">
                  {value === 9999 ? 'Full (pill)' : `${value}px`}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Elevation Tokens */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          M3 Elevation Tokens
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          {Object.entries(elevationTokens).map(([name, value]) => (
            <Grid key={name} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  textAlign: 'center',
                  boxShadow: value,
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  {name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {value === 'none' ? 'No shadow' : 'Subtle elevation'}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Usage Example */}
      <Paper variant="outlined" sx={{ p: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Using M3 Tokens
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Box
          component="pre"
          sx={{
            p: 2,
            bgcolor: 'grey.900',
            color: 'grey.100',
            borderRadius: 2,
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'monospace',
          }}
        >
          {`import { shapeTokens, elevationTokens } from '@dt/mui-ui';
import Box from '@mui/material/Box';

function MyComponent() {
  return (
    <Box
      sx={{
        borderRadius: \`\${shapeTokens.medium}px\`,
        boxShadow: elevationTokens.level2,
        p: 3,
      }}
    >
      Content with M3 shape and elevation
    </Box>
  );
}`}
        </Box>
      </Paper>
    </Box>
  );
}
