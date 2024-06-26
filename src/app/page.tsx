'use client';

import { Account, ConnectWallet, PageLayout } from "@/components";
import { FormWrapper } from "@/components/wallet-actions";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <PageLayout className="min-w-[60rem]">
      {mounted && (
        <div className="flex flex-col items-center justify-between">
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] mb-8">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/socket-logo.svg"
              alt="Socket.ETH"
              width={180}
              height={37}
              priority
            />
          </div>

          <div className="max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <ConnectWallet />
          </div>

          <Account />
          <FormWrapper />
        </div>
      )}
    </PageLayout>
  );
}
