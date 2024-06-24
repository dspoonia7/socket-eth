'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import { sepolia, bscTestnet, blastSepolia } from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = '211472b7f0addd5049b5545c48b546f9';
const supportedChains: Chain[] = [
  // mainnet,
  sepolia,
  blastSepolia
];

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
//     [sepolia.id]: http(),
//   },
// })

export const wagmiConfig = getDefaultConfig({
  appName: 'Socket.ETH',
  projectId: projectId,
  chains: supportedChains as any,
  transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {}),
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
