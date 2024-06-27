'use client';

import { useState, useEffect } from "react";

import { DataLayerProvider, RainbowKitClientProvider, WagmiClientProvider } from "@/shared/providers";

export const AppGate = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiClientProvider>
      <DataLayerProvider>
        <RainbowKitClientProvider>
          {mounted && children}
        </RainbowKitClientProvider>
      </DataLayerProvider>
    </WagmiClientProvider>
  );
}
