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
      {contractResponse?.isSuccess && transactionReceipt?.isSuccess && (
        <div className="font-bold text-sm text-green-800 mb-4">
          {action === WALLET_ACTIONS.WRAP ? 'Wrap' : 'Unwrap'} transaction successful!
        </div>
      )}
      {contractResponse?.isSuccess ? (
        <div className="flex flex-col gap-2">
          <div className="font-bold text-sm">
            1. Transaction complete
          </div>
          <div className="flex flex-col items-start gap-1 ml-4">
            <div className="text-sm">Transaction hash:</div>
            <a
              className="italic text-blue-700 text-xs"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://sepolia.etherscan.io/tx/${contractResponse?.data}`}
            >
              {contractResponse?.data}
            </a>
          </div>
        </div>
      ) : contractResponse?.isPending ? (
        <div className="flex items-start text-sm">
          <div>Transaction in progress...</div>
        </div>
      ) : contractResponse?.isError && (
        <div className="flex flex-col items-start gap-2">
          <div className="text-sm">Transaction failed!</div>
          <div className="text-xs text-red-700 italic bg-red-100 ml-4">
            {(contractResponse?.error as BaseError)?.details}
          </div>
        </div>
      )}

      {contractResponse?.isSuccess && (
        <div className="mt-4">
          {transactionReceipt?.isSuccess ? (
            <div className="flex flex-col gap-2">
              <div className="font-bold text-sm">
                2. Transaction receipt received
              </div>
              <div className="flex flex-col items-start gap-1 ml-4">
                <div className="text-sm">Block hash:</div>
                <div className="italic text-xs">{transactionReceipt?.data?.blockHash}</div>
              </div>
            </div>
          ) : transactionReceipt?.isLoading ? (
            <div className="flex items-start text-sm">
              <div>2. Fetching transaction receipt...</div>
            </div>
          ) : transactionReceipt?.isError && (
            <div className="flex flex-col items-start gap-2">
              <div className="text-sm">2. Error fetching receipt!</div>
              <div className="text-xs text-red-700 italic bg-red-100 ml-4">
                {(transactionReceipt?.error as BaseError)?.details}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}