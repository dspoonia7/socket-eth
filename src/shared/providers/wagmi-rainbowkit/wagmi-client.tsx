'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider, cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { PropsWithChildren } from 'react';
import { wagmiConfig } from './wagmi-config';

interface WagmiRainbowKitProviderProps {
  className?: string;
}

export const WagmiClientProvider = ({ children }: PropsWithChildren<WagmiRainbowKitProviderProps>) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      {children}
    </WagmiProvider>
  );
};