import { StateCreator, create as zCreate } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Wrapper function to apply immer & devtools
export const create = <T>(
  store: StateCreator<T, [['zustand/devtools', never], ['zustand/immer', never]], []>
) => {
  return zCreate<T>()(devtools(immer(store)));
};
