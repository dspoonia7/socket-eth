'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { PageLayout } from "@/components";
import { DataLayerProvider, WagmiRainbowKitClient } from "@/shared/providers";


export default function Home() {
  return (
    <WagmiRainbowKitClient>
      <DataLayerProvider>
        <PageLayout>
          <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            Eth Wrap Unwrap
          </div>
          </PageLayout>
      </DataLayerProvider>
    </WagmiRainbowKitClient>
  );
}
