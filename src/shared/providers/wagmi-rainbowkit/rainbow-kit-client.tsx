import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { PropsWithChildren } from 'react';

export const RainbowKitClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <RainbowKitProvider theme={darkTheme()}>
      {children}
    </RainbowKitProvider>
  );
};