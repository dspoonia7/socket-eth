"use client";

import { useEffect, useRef } from "react";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { FaHome } from "react-icons/fa";

export const ConnectWallet = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (!isConnected) {
    return (
      <button
        className="socket-btn"
        onClick={async () => {
          // Disconnect wallet first to handle the use case when is connected but the user is not connected
          if (isConnected) {
            disconnect();
          }
          openConnectModal?.();
        }}
        disabled={isConnecting}
      >
        { isConnecting ? 'Loading...' : 'Connect your wallet' }
      </button>
    );
  }

  if (isConnected && !chain) {
    return (
      <button className="socket-btn" onClick={openChainModal}>
        Wrong network
      </button>
    );
  }

  return (
    <div className="max-w-5xl w-full flex items-center justify-between">
      <div
        className="flex justify-center items-center px-4 py-2 border border-neutral-700 bg-neutral-800/30 rounded-xl font-mono font-bold gap-x-2 cursor-pointer"
        onClick={async () => openAccountModal?.()}
      >
        <div
          role="button"
          tabIndex={1}
          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-cyan-100 shadow-md"
        >
          <FaHome />
        </div>
        <div>Account</div>
      </div>
      <div className="flex items-center gap-2">
        <button className="socket-btn" onClick={openChainModal}>
          Switch Networks
        </button>
        <button className="socket-btn" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    </div>
  );
};