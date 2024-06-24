import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { PropsWithChildren } from 'react';

const config = getDefaultConfig({
  appName: 'Socket.ETH',
  projectId: 'SOCKET_ETH_WRAP_UNWRAP',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  // ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

interface WagmiRainbowKitProviderProps {
  className?: string;
}

export const WagmiRainbowKitClient = ({ children }: PropsWithChildren<WagmiRainbowKitProviderProps>) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};