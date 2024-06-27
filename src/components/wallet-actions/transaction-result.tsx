import { WALLET_ACTIONS } from "@/shared/constants";
import { type BaseError } from "wagmi";

interface TransactionResultProps {
  action: WALLET_ACTIONS,
  contractResponse: any,
  transactionReceipt: any
}

export const TransactionResult = ({ action, contractResponse, transactionReceipt }: TransactionResultProps) => {
  return (
    <div className="flex flex-col mt-9 mb-12">
      {transactionReceipt?.isSuccess ? (
        <div className="flex flex-col gap-4">
          <div className="font-bold text-sm text-green-800">
            {action === WALLET_ACTIONS.WRAP ? 'Wrap' : 'Unwrap'} transaction successful!
          </div>
          <div className="flex flex-col items-start gap-1">
            <div className="text-sm">Transaction hash:</div>
            <a
              className="italic text-blue-700 text-xs"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://sepolia.etherscan.io/tx/${transactionReceipt?.data?.transactionHash || contractResponse?.data}`}
            >
              {transactionReceipt?.data?.transactionHash}
            </a>
          </div>
        </div>
      ) : (contractResponse?.isPending) ? (
        <div className="flex items-start">
          <div>Processing transaction...</div>
        </div>
      ) : (transactionReceipt?.isLoading) ? (
        <div className="flex items-start">
          <div>Fetching transaction receipt...</div>
        </div>
      ) : contractResponse?.isError && (
        <div className="flex flex-col items-start gap-2">
          <div className="text-sm">Transaction failed!</div>
          <div className="text-xs text-red-700 italic bg-red-100">
            {(contractResponse?.error as BaseError)?.details}
          </div>
        </div>
      )}
    </div>
  )
}