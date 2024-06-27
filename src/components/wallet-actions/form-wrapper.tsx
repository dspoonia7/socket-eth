import { useAccount } from "wagmi";
import { useState } from "react";
import clsx from "clsx";

import { WALLET_ACTIONS, WrapUnwrapForm } from "./wrap-unwrap-form";
import { useBalances } from "@/shared/hooks/use-balances";

export const FormWrapper = () => {
  const { address, isConnected, chain } = useAccount();
  const [action, setAction] = useState(WALLET_ACTIONS.WRAP);

  if (!isConnected ||!chain) return null;

  const isWrap = action === WALLET_ACTIONS.WRAP;
  const symbol = chain?.nativeCurrency?.symbol || 'ETH';
  return (
    <section className="relative flex flex-col gap-9 w-[40rem] mt-12">
      <div className="w-full relative z-10 flex items-center gap-1 rounded-lg border border-stroke bg-white p-1 dark:border-dark-stroke dark:bg-white/[.02]">
        <span className={clsx("absolute top-1 -z-10 h-8 w-[50%] rounded-md bg-dark duration-200 dark:bg-white", isWrap ? 'left-1' : 'left-[20rem]')}></span>
        <button
          className={clsx(
            'inline-flex h-8 w-[50%] items-center justify-center rounded-md px-3 text-sm font-medium duration-200',
            isWrap ? 'text-white dark:text-dark' : 'text-dark-5 hover:bg-gray-1 hover:text-dark dark:hover:bg-white/5 dark:hover:text-white',
          )}
          onClick={() => setAction(WALLET_ACTIONS.WRAP)}
        >
            Wrap {symbol}
        </button>
        <button
          className={clsx(
            'inline-flex h-8 w-[50%] items-center justify-center rounded-md px-3 text-sm font-medium duration-200',
            !isWrap ? 'text-white dark:text-dark' : 'text-dark-5 hover:bg-gray-1 hover:text-dark dark:hover:bg-white/5 dark:hover:text-white',
          )}
          onClick={() => setAction(WALLET_ACTIONS.UNWRAP)}
        >
          Unwrap {symbol}
        </button>
      </div>

      <WrapUnwrapForm action={action} />
    </section>
  );
}
