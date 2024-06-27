import { useDebounce } from 'usehooks-ts';
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { parseEther } from 'viem';
import { type UseSimulateContractParameters } from 'wagmi';

import { accountAddress, sepContractAddress, wagmiContractAbiConfig } from '../config';

export const useWithdraw = (transactionAmount: number) => {
  const { address, chain } = useAccount();
  const accAddress = address ?? accountAddress;

  const debouncedValue = useDebounce(transactionAmount, 1000);

  const simulateContract = useSimulateContract({
    abi: wagmiContractAbiConfig,
    address: sepContractAddress,
    functionName: 'withdraw',
    account: accAddress,
    query: { enabled: Boolean(debouncedValue) },
    args: [BigInt(parseEther(debouncedValue?.toString() || '0'))],
  } as UseSimulateContractParameters);

  const { writeContract: writeWithdraw, ...withdrawResponse } = useWriteContract();
  const withdrawTransactionReceipt = useWaitForTransactionReceipt({ hash: withdrawResponse?.data });

  return {
    simulateContract,
    writeWithdraw,
    withdrawResponse,
    withdrawTransactionReceipt,
  };
};
