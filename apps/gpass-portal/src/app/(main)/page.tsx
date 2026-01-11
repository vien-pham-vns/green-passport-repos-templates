import Box from '@mui/material/Box';

import { PaperLayout } from '@/components/paper-layout';

export default function RootPage() {
  return (
    <PaperLayout>
      Portal page
      <Box className='bg-amber-200'>Hello Tailwindcss</Box>
    </PaperLayout>
  );
}
