'use client';
'use memo';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

interface MediaDialogProps {
  open: boolean;
  onClose: () => void;
  mediaUrl: string;
  isVideo: boolean;
}

export default function MediaDialog({
  open,
  onClose,
  mediaUrl,
  isVideo,
}: MediaDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible',
          },
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: -40,
          top: -40,
          color: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // minWidth: 500,
          // minHeight: 500,
        }}
      >
        {isVideo ? (
          <Box
            sx={{
              width: 700,
              height: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
            }}
          >
            <video
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              controls
              autoPlay
            >
              <source src={mediaUrl} />
            </video>
          </Box>
        ) : (
          <Box
            sx={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '80vh',
              minWidth: 300,
              minHeight: 300,
              backgroundColor: 'black',
            }}
          >
            <Image
              src={mediaUrl}
              alt='Selected media'
              width={0}
              height={0}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '80vh',
                objectFit: 'contain',
              }}
              sizes='(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 50vw'
              priority
              unoptimized
            />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
