import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { PropsWithChildren } from 'react';

export const RainbowKitClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <RainbowKitProvider>
      {children}
    </RainbowKitProvider>
  );
};