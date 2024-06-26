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

export const useDeposit = (transactionAmount: number) => {
  const { address, chain } = useAccount();
  const accAddress = address ?? accountAddress;

  const debouncedValue = useDebounce(transactionAmount, 1000);

  const simulateContract = useSimulateContract({
    abi: wagmiContractAbiConfig,
    address: sepContractAddress,
    functionName: 'deposit',
    account: accAddress,
    query: { enabled: Boolean(debouncedValue) },
    value: BigInt(parseEther(debouncedValue?.toString() || '0')),
  } as UseSimulateContractParameters);

  const { writeContract: writeDeposit, ...depositResponse } = useWriteContract();
  const depositTransactionReceipt = useWaitForTransactionReceipt({ hash: depositResponse?.data });

  return {
    simulateContract,
    writeDeposit,
    depositResponse,
    depositTransactionReceipt,
  };
};
