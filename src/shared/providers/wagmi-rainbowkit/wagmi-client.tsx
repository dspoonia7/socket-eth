import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
import { PropsWithChildren } from 'react';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { ledgerWallet } from '@rainbow-me/rainbowkit/wallets';

const projectId = '211472b7f0addd5049b5545c48b546f9';

// const defaultConfig = getDefaultConfig({
//   appName: 'Socket.ETH',
//   projectId: 'SOCKET_ETH_WRAP_UNWRAP',
//   chains: [mainnet, polygon, optimism, arbitrum, base],
//   // ssr: true, // If your dApp uses server side rendering (SSR)
// });
//

// const wagmiConfig = createConfig({
//   chains: [mainnet, base, sepolia],
//   connectors: [
//     injected(),
//     walletConnect({ projectId }),
//     metaMask(),
//     safe(),
//   ],
//   transports: {
//     [mainnet.id]: http(),
//     [base.id]: http(),
//     [sepolia.id]: http(),
//   },
// })

const config = getDefaultConfig({
  appName: 'Socket.ETH',
  projectId: projectId,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  // ssr: true, // If your dApp uses server side rendering (SSR)
})


interface WagmiRainbowKitProviderProps {
  className?: string;
}

export const WagmiClientProvider = ({ children }: PropsWithChildren<WagmiRainbowKitProviderProps>) => {
  return (
    <WagmiProvider config={config}>
      {children}
    </WagmiProvider>
  );
};