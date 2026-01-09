'use client';
'use memo';

import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

interface IframeModalProps {
  open: boolean;
  onClose: () => void;
  iframeUrl: string;
  title?: string;
}

export default function IframeModal({
  open,
  onClose,
  iframeUrl,
  title = 'Content',
}: IframeModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleClose = () => {
    setIsLoading(true);
    setHasError(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='xl'
      fullWidth
      aria-labelledby='iframe-modal-title'
      aria-describedby='iframe-modal-description'
      sx={{
        '& .MuiDialog-paper': {
          height: '90vh',
          maxHeight: '90vh',
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        aria-label='Close modal'
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'grey.700',
          backgroundColor: 'background.paper',
          zIndex: 1,
          '&:hover': {
            backgroundColor: 'grey.100',
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {isLoading && !hasError && (
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
              zIndex: 2,
            }}
          >
            <CircularProgress size={48} />
            <Typography variant='body1' color='text.secondary'>
              Loading content...
            </Typography>
          </Box>
        )}

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
      </DialogContent>
    </Dialog>
  );
}
