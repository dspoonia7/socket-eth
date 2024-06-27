import { useEffect, useMemo, useState } from "react";
import { type UseWriteContractParameters, useAccount } from "wagmi";
import { parseEther } from "viem";

import { useDeposit, useTransactionFee } from "@/shared/hooks";
import { useBalances } from "@/shared/hooks/use-balances";
import { accountAddress, sepContractAddress, wagmiContractAbiConfig } from "@/shared/config";
import clsx from "clsx";
import { useWithdraw } from "@/shared/hooks/use-withdraw";
import { TransactionResult } from "./transaction-result";
import { WALLET_ACTIONS } from "@/shared/constants";

const MIN_AMOUNT = 0.000001;
interface WrapUnwrapFormProps {
  action: WALLET_ACTIONS;
}

export const WrapUnwrapForm = ({ action }: WrapUnwrapFormProps) => {
  const { address, chain } = useAccount();
  const { ethBalance, wethBalance } = useBalances();
  const { txFeeEther } = useTransactionFee();

  const [inputAmount, setInputAmount] = useState<number>();
  const transactionAmount: number = useMemo(() => {
    if (inputAmount && inputAmount < MIN_AMOUNT) return MIN_AMOUNT; // min amount
    return inputAmount || 0
  }, [inputAmount]);

  const {
    writeDeposit,
    depositResponse,
    depositTransactionReceipt,
  } = useDeposit(transactionAmount);
  const {
    writeWithdraw,
    withdrawResponse,
    withdrawTransactionReceipt,
  } = useWithdraw(transactionAmount);

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

    if (action === WALLET_ACTIONS.WRAP) {
      writeDeposit({
        abi: wagmiContractAbiConfig,
        address: sepContractAddress,
        functionName: 'deposit',
        account: address ?? accountAddress,
        value: BigInt(parseEther(transactionAmount?.toString() || '0')),
      });
    } else if (action === WALLET_ACTIONS.UNWRAP) {
      writeWithdraw({
        abi: wagmiContractAbiConfig,
        address: sepContractAddress,
        functionName: 'withdraw',
        account: address ?? accountAddress,
        args: [BigInt(parseEther(transactionAmount?.toString() || '0'))],
      })
    }
  };

  const isDeposit = action === WALLET_ACTIONS.WRAP;
  const symbol = chain?.nativeCurrency?.symbol ?? 'ETH';

  const transactionProcessing = depositResponse?.isPending || depositTransactionReceipt?.isLoading;
  const disabledState = transactionProcessing || !transactionAmount;
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center justify-between gap-2">
          <button type="button" className="socket-btn socket-btn-md" onClick={onClickSetMax}>Set Max Limit</button>
          <button type="button" className="socket-btn socket-btn-md" onClick={onClickReset}>Reset</button>
        </div>
        <div className="flex items-center gap-2">
          <div>{isDeposit ? '' : 'W'}{symbol} Balance:</div>
          <div>{isDeposit ? ethBalance?.slice(0, 6) || 0 : wethBalance?.slice(0, 6) || 0}</div>
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

      {isDeposit ? (
        <TransactionResult
          action={action}
          contractResponse={depositResponse}
          transactionReceipt={depositTransactionReceipt}
        />
      ) : (
        <TransactionResult
          action={action}
          contractResponse={withdrawResponse}
          transactionReceipt={withdrawTransactionReceipt}
        />
      )}
    </div>
  )
}
