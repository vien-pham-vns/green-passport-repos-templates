import NextLink from 'next/link';

export const LinkBehavior = (props: any) => {
  const { href, ...other } = props;
  return <NextLink href={href} {...other} />;
};
