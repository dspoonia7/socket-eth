'use client';

import { Account, PageLayout } from "@/components";
import { ConnectWallet } from "@/components/connect-wallet/connect-wallet";
import { DataLayerProvider, RainbowKitClientProvider, WagmiClientProvider } from "@/shared/providers";


export default function Home() {
  return (
    <WagmiClientProvider>
      <DataLayerProvider>
        <RainbowKitClientProvider>
          <PageLayout>
            <div className="flex flex-col items-center justify-between font-mono text-sm lg:flex">
              <div>Eth Wrap Unwrap</div>
              <ConnectWallet />
            </div>
          </PageLayout>
        </RainbowKitClientProvider>
      </DataLayerProvider>
    </WagmiClientProvider>
  );
}
