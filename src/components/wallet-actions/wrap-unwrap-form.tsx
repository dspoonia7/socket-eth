import { useEffect, useState } from "react";

import { useDeposit, useTransactionFee } from "@/shared/hooks";
import { useBalances } from "@/shared/hooks/use-balances";
import { type UseWriteContractParameters, useAccount } from "wagmi";
import { parseEther } from "viem";
import { abiConfig } from '../../shared/hooks/use-deposit';
import { sepContractAddress } from "@/shared/config";

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

  const {
    writeDeposit,
    depositResponse,
    transactionReceipt,
  } = useDeposit(inputAmount);

  // console.log('debug-WrapUnwrapForm', depositResponse, transactionReceipt)

  useEffect(() => {
    if (depositResponse.data) {
      onClickReset();
    }
  }, [depositResponse.data])

  const onInputChange = (event: any) => {
    const value = event.target.value;
    console.log('onInputChange', event.target.value)
    if (!isNaN(value) && value > 0) {
      setInputAmount(value)
    }
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
    if (!inputAmount || inputAmount > .001) return; // limit .001 is for development only

    writeDeposit({
      abi: abiConfig,
      address: sepContractAddress,
      functionName: 'deposit',
      account: address ?? '0xe35e05313CB010E174Dd6C85b9F274180a25524b',
      value: BigInt(parseEther(inputAmount?.toString() || '0')),
    });
  };

  const isWrap = action === WALLET_ACTIONS.WRAP;
  const symbol = chain?.nativeCurrency?.symbol ?? 'ETH';
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
          type="number"
          value={inputAmount}
          onChange={onInputChange}
        />
        <button
          type="button" 
          className="socket-btn socket-btn-md !bg-black text-white"
          onClick={onClickSubmit}>
            Submit
          </button>
      </div>

      <div className="flex flex-col mt-9">
        {transactionReceipt?.isSuccess ? (
          <div className="flex flex-col gap-4">
            <div className="font-bold text-sm text-green-800">Transaction successful!</div>
            <div className="inline-flex items-start gap-1">
              <div className="text-xs">Transaction hash:</div>
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
        ) : (depositResponse?.isPending || transactionReceipt?.isLoading) && (
          <div className="flex items-start">
            <div>Loading...</div>
          </div>
        )}
      </div>
    </div>
  )
}