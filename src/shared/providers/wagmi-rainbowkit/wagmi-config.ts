'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import { sepolia, blastSepolia } from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = process.env.ETH_PROJECT_ID || '';
const supportedChains: Chain[] = [
  sepolia,
  blastSepolia
];

// const wagmiConfig = createConfig({
//   chains: [sepolia],
//   connectors: [
//     injected(),
//     walletConnect({ projectId }),
//     metaMask(),
//   ],
//   transports: {
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
