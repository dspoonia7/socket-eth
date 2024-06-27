import { useEffect, useState } from "react";
import { type BaseError, type UseWriteContractParameters, useAccount } from "wagmi";
import { parseEther } from "viem";

import { useDeposit, useTransactionFee } from "@/shared/hooks";
import { useBalances } from "@/shared/hooks/use-balances";
import { accountAddress, sepContractAddress, wagmiContractAbiConfig } from "@/shared/config";
import clsx from "clsx";

export enum WALLET_ACTIONS {
  WRAP = 'deposit',
  UNWRAP = 'withdraw',
}

interface WrapUnwrapFormProps {
  action: WALLET_ACTIONS;
}

export const WrapUnwrapForm = ({ action }: WrapUnwrapFormProps) => {
  const { address, chain } = useAccount();
  const { ethBalance, wethBalance } = useBalances();
  const { txFeeEther } = useTransactionFee();

  const [inputAmount, setInputAmount] = useState<number>();
  const transactionAmount: number = inputAmount || 0;

  const {
    writeDeposit,
    depositResponse,
    transactionReceipt,
  } = useDeposit(transactionAmount);

  // console.log('debug-WrapUnwrapForm', depositResponse, transactionReceipt)

  useEffect(() => {
    if (depositResponse.data) {
      onClickReset();
    }
  }, [depositResponse.data])

  const onInputChange = (event: any) => {
    const value = event.target.value;
    setInputAmount(+value)
  }

  const onClickSetMax = () => {
    const eth = +ethBalance - +txFeeEther;
    const weth = +wethBalance;
    setInputAmount(
      action === WALLET_ACTIONS.WRAP
        ? parseFloat(eth.toFixed(4))
        : parseFloat(weth.toFixed(4)),
    );
  };

  const onClickReset = () => {
    setInputAmount(0);
  };

  const onClickSubmit = () => {
    if (!transactionAmount) return;

    writeDeposit({
      abi: wagmiContractAbiConfig,
      address: sepContractAddress,
      functionName: 'deposit',
      account: address ?? accountAddress,
      value: BigInt(parseEther(transactionAmount?.toString() || '0')),
    });
  };

  const isWrap = action === WALLET_ACTIONS.WRAP;
  const symbol = chain?.nativeCurrency?.symbol ?? 'ETH';

  const transactionProcessing = depositResponse?.isPending || transactionReceipt?.isLoading;
  const disabledState = transactionProcessing || !transactionAmount;
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center justify-between gap-2">
          <button type="button" className="socket-btn socket-btn-md" onClick={onClickSetMax}>Set Max Limit</button>
          <button type="button" className="socket-btn socket-btn-md" onClick={onClickReset}>Reset</button>
        </div>
        <div className="flex items-center gap-2">
          <div>{isWrap ? '' : 'W'}{symbol} Balance:</div>
          <div>{isWrap ? ethBalance?.slice(0, 6) || 0 : wethBalance?.slice(0, 6) || 0}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full">
        <input
          className="flex flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-black focus:border-black p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
          step="any"
          type="number"
          value={inputAmount}
          onChange={onInputChange}
        />
        <button
          type="button"
          disabled={disabledState}
          className={clsx("socket-btn socket-btn-md !bg-black text-white", disabledState && 'opacity-60')}
          onClick={onClickSubmit}
        >
          Submit
        </button>
      </div>

      <div className="flex flex-col mt-9 mb-12">
        {transactionReceipt?.isSuccess ? (
          <div className="flex flex-col gap-4">
            <div className="font-bold text-sm text-green-800">Transaction successful!</div>
            <div className="flex flex-col items-start gap-1">
              <div className="text-sm">Transaction hash:</div>
              <a
                className="italic text-blue-700 text-xs"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://sepolia.etherscan.io/tx/${transactionReceipt?.data?.transactionHash || depositResponse?.data}`}
              >
                {transactionReceipt?.data?.transactionHash}
              </a>
            </div>
          </div>
        ) : (depositResponse?.isPending) ? (
          <div className="flex items-start">
            <div>Processing transaction...</div>
          </div>
        ) : (transactionReceipt?.isLoading) ? (
          <div className="flex items-start">
            <div>Fetching transaction receipt...</div>
          </div>
        ) : depositResponse?.isError && (
          <div className="flex flex-col items-start gap-2">
            <div className="text-sm">Transaction failed!</div>
            <div className="text-xs text-red-700 italic bg-red-100">
              {(depositResponse?.error as BaseError)?.details}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}