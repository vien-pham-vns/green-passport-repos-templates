"use client";

import MuiContainer, { type ContainerProps as MuiContainerProps } from '@mui/material/Container';

export type ContainerProps = MuiContainerProps;

/**
 * Container component - wrapper around MUI Container
 *
 * @example
 * <Container maxWidth="lg">
 *   <h1>My App</h1>
 * </Container>
 */
export default function Container(props: ContainerProps) {
  return <MuiContainer {...props} />;
}
