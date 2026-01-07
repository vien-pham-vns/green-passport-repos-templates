import Image from 'next/image';

export const LoginLogo = () => (
  <>
    <Image
      preload
      src=''
      width={1024}
      height={978}
      style={{
        objectFit: 'contain',
        width: '512px',
        height: '164px',
      }}
      alt='Propass login logo'
    />
  </>
);

export const ForgotPasswordLogo = () => (
  <Image src='' width={100} height={100} alt='forgot-password-logo' />
);

export const SuccessLogo = () => (
  <Image src='' width={100} height={100} alt='forgot-password-success-logo' />
);
