'use client';
'use memo';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface IframeBoxProps {
  iframeUrl: string;
  title?: string;
}

/**
 * IframeBox component - A reusable box that displays an iframe
 *
 * Features:
 * - Accessible with ARIA attributes
 * - Error handling for iframe load failures
 *
 * @example
 * <IframeBox
 *   iframeUrl="https://example.com"
 *   title="External Content"
 * />
 */
export default function IframeBox({ iframeUrl, title = 'Content' }: IframeBoxProps) {
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setHasError(false);
  };

  const handleIframeError = () => {
    setHasError(true);
  };

  return (
    <Box
      sx={{
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
      }}
    >
      {hasError && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
            gap: 2,
            p: 4,
          }}
        >
          <Typography variant='h6' color='error'>
            Failed to load content
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            The content could not be loaded. Please try again later.
          </Typography>
        </Box>
      )}

      <Box
        component='iframe'
        id='iframe-modal-description'
        src={iframeUrl}
        title={title}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        sx={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: hasError ? 'none' : 'block',
        }}
      />
    </Box>
  );
}
