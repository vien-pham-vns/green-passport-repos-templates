'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import DownloadIcon from '@mui/icons-material/Download';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

/**
 * Government Theme Demo Component
 *
 * Demonstrates the government-compliant MUI theme featuring:
 * - WCAG 2.2 AA compliant colors (7.47:1 contrast ratios)
 * - Enhanced focus indicators (3px outline, 2px offset)
 * - 24x24px minimum touch targets
 * - High-contrast mode support
 * - Government-appropriate styling
 * - U.S. Web Design System (USWDS) alignment
 */
export default function GovernmentThemeDemo() {
  return (
    <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <AccessibilityNewIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h3" fontWeight={500}>
            Government UI Theme Demo
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          A WCAG 2.2 AA compliant theme for government applications
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="WCAG 2.2 AA" color="primary" size="small" />
          <Chip label="USWDS Aligned" color="secondary" size="small" />
          <Chip label="EAA Compliant" color="info" size="small" />
          <Chip label="7.47:1 Contrast" color="success" size="small" />
        </Box>
      </Box>

      {/* Accessibility Features */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Accessibility Features
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight={600} color="primary">
                ENHANCED CONTRAST RATIOS
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                All colors exceed WCAG 2.2 AA standards. Primary color has 7.47:1 contrast ratio on
                white backgrounds (exceeds 4.5:1 requirement).
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                    border: '2px solid',
                    borderColor: 'divider',
                  }}
                />
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'error.main',
                    borderRadius: 1,
                    border: '2px solid',
                    borderColor: 'divider',
                  }}
                />
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'success.main',
                    borderRadius: 1,
                    border: '2px solid',
                    borderColor: 'divider',
                  }}
                />
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight={600} color="primary">
                FOCUS INDICATORS (WCAG 2.2)
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                All interactive elements have 3px solid outline with 2px offset. Try tabbing
                through the buttons below.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button variant="contained" size="small">
                  Tab Here
                </Button>
                <Button variant="outlined" size="small">
                  Then Here
                </Button>
                <Button variant="text" size="small">
                  And Here
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom fontWeight={600} color="primary">
                MINIMUM TOUCH TARGETS
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                All interactive elements meet 24x24px minimum. Buttons are 44px+ height (exceeds
                requirement).
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Button variant="contained">44px Height</Button>
                <IconButton color="primary">
                  <InfoIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom fontWeight={600} color="primary">
                ENHANCED TYPOGRAPHY
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                16px base font size, 1.6 line height for improved readability. System fonts for
                better performance.
              </Typography>
              <Typography variant="body1">
                The quick brown fox jumps over the lazy dog. Optimized for extended reading with
                proper spacing and contrast.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Alert System */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Alert System (High Visibility)
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="error" icon={<ErrorIcon />}>
            <Typography variant="body2" fontWeight={500}>
              Critical Error: System maintenance required. Please contact IT support immediately.
            </Typography>
          </Alert>

          <Alert severity="warning" icon={<WarningIcon />}>
            <Typography variant="body2" fontWeight={500}>
              Warning: Your session will expire in 5 minutes. Please save your work.
            </Typography>
          </Alert>

          <Alert severity="info" icon={<InfoIcon />}>
            <Typography variant="body2" fontWeight={500}>
              Information: New accessibility features have been added to improve user experience.
            </Typography>
          </Alert>

          <Alert severity="success" icon={<CheckCircleIcon />}>
            <Typography variant="body2" fontWeight={500}>
              Success: Your application has been submitted successfully. Reference ID: GOV-2025-001
            </Typography>
          </Alert>
        </Box>
      </Paper>

      {/* Government Forms */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Government Forms (Accessible)
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Full Name"
              required
              fullWidth
              helperText="Enter your legal name as it appears on official documents"
              placeholder="John Smith"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Email Address"
              type="email"
              required
              fullWidth
              helperText="We'll send confirmation to this email"
              placeholder="john.smith@example.gov"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth required>
              <InputLabel>Department</InputLabel>
              <Select label="Department" defaultValue="">
                <MenuItem value="admin">Administration</MenuItem>
                <MenuItem value="finance">Finance</MenuItem>
                <MenuItem value="operations">Operations</MenuItem>
                <MenuItem value="it">Information Technology</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Phone Number"
              type="tel"
              fullWidth
              helperText="Format: (123) 456-7890"
              placeholder="(123) 456-7890"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Request Details"
              multiline
              rows={4}
              fullWidth
              required
              helperText="Please provide detailed information about your request"
              placeholder="Describe your request in detail..."
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={<Switch />}
              label="I agree to the terms and conditions and privacy policy"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" size="large" startIcon={<DownloadIcon />}>
                Submit Application
              </Button>
              <Button variant="outlined" size="large">
                Save Draft
              </Button>
              <Button variant="text" size="large">
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Data Tables */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Data Tables (Enhanced Borders & Readability)
        </Typography>
        <Divider sx={{ my: 3 }} />

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Application ID</TableCell>
                <TableCell>Applicant Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submitted Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>
                  <Typography variant="body2" component="code" fontFamily="monospace">
                    GOV-2025-001
                  </Typography>
                </TableCell>
                <TableCell>John Smith</TableCell>
                <TableCell>Finance</TableCell>
                <TableCell>
                  <Chip label="Approved" color="success" size="small" />
                </TableCell>
                <TableCell>2025-01-15</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  <Typography variant="body2" component="code" fontFamily="monospace">
                    GOV-2025-002
                  </Typography>
                </TableCell>
                <TableCell>Jane Doe</TableCell>
                <TableCell>Operations</TableCell>
                <TableCell>
                  <Chip label="Pending" color="warning" size="small" />
                </TableCell>
                <TableCell>2025-01-16</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  <Typography variant="body2" component="code" fontFamily="monospace">
                    GOV-2025-003
                  </Typography>
                </TableCell>
                <TableCell>Robert Johnson</TableCell>
                <TableCell>IT</TableCell>
                <TableCell>
                  <Chip label="Rejected" color="error" size="small" />
                </TableCell>
                <TableCell>2025-01-17</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Accessible Links */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Accessible Links (Always Underlined)
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Typography variant="body1" paragraph>
          Links are always underlined for accessibility and have enhanced focus indicators. See{' '}
          <Link href="#" underline="always">
            WCAG 2.2 Guidelines
          </Link>{' '}
          for more information about{' '}
          <Link href="#" underline="always">
            link accessibility requirements
          </Link>
          . You can also visit our{' '}
          <Link href="#" underline="always">
            accessibility statement
          </Link>{' '}
          or{' '}
          <Link href="#" underline="always">
            contact us
          </Link>{' '}
          for assistance.
        </Typography>
      </Paper>

      {/* Statistics Cards */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Statistics & Metrics
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  TOTAL APPLICATIONS
                </Typography>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  1,234
                </Typography>
                <Typography variant="body2" color="success.main">
                  +12.5% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  PENDING REVIEW
                </Typography>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  87
                </Typography>
                <Typography variant="body2" color="warning.main">
                  Requires attention
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  APPROVED TODAY
                </Typography>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  23
                </Typography>
                <Typography variant="body2" color="success.main">
                  On track
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  AVG. PROCESSING TIME
                </Typography>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  2.3d
                </Typography>
                <Typography variant="body2" color="info.main">
                  -0.5d improvement
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Color Contrast Reference */}
      <Paper variant="outlined" sx={{ p: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h5" gutterBottom fontWeight={500}>
          Color Contrast Ratios
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                Primary Blue: 7.47:1
              </Typography>
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1">
                  Professional blue for primary actions and branding. Exceeds WCAG AAA standard for
                  large text.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                Error Red: 7.26:1
              </Typography>
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'error.main',
                  color: 'error.contrastText',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1">
                  High-visibility red for critical alerts and error states. Clear and unmistakable.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                Secondary Teal: 6.12:1
              </Typography>
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'secondary.main',
                  color: 'secondary.contrastText',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1">
                  Trustworthy teal for secondary actions. Professional and government-appropriate.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                Success Green: 5.93:1
              </Typography>
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'success.main',
                  color: 'success.contrastText',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1">
                  Clear green for positive states and successful operations. Easily recognizable.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
