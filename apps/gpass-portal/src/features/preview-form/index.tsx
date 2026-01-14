// 'use client';
// 'use memo';

// import React, { useState } from 'react';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// import IframeBox from '@/components/iframe-box';
// import IframeModal from '@/components/iframe-modal';

// import { DEFAULT_IFRAME_URL, DEFAULT_MODAL_TITLE } from './config';
// import type { PreviewFormProps } from './type';

// export default function PreviewForm({
//   iframeUrl = DEFAULT_IFRAME_URL,
//   title = DEFAULT_MODAL_TITLE,
// }: PreviewFormProps = {}): React.JSX.Element {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//         <Typography variant='h5' component='h1' fontWeight={600}>
//           Welcome to Green Passport Portal
//         </Typography>

//         <Typography variant='body1' color='text.secondary'>
//           Click the button below to view the application details.
//         </Typography>

//         <Box>
//           <Button
//             variant='contained'
//             color='primary'
//             size='large'
//             onClick={handleOpenModal}
//           >
//             View Application Details
//           </Button>
//         </Box>

//         <IframeBox iframeUrl={iframeUrl} title={title} />
//       </Box>

//       <IframeModal
//         open={isModalOpen}
//         onClose={handleCloseModal}
//         iframeUrl={iframeUrl}
//         title={title}
//       />
//     </>
//   );
// }
