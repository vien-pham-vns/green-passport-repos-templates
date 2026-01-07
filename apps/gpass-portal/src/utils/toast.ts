import { ToastPosition, toast } from 'react-toastify';

const toastOptions = {
  position: 'top-center' as ToastPosition,
  style: {
    minWidth: '400px',
  },
};

export const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning',
  isNotClose?: boolean
) => {
  if (isNotClose) {
    return toast[type](message, { ...toastOptions, autoClose: false });
  }

  return toast[type](message, {
    ...toastOptions,
  });
};
