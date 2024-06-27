import { useDebounce } from 'usehooks-ts';
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { parseEther } from 'viem';
import { type UseSimulateContractParameters } from 'wagmi';

import { networkAddressMap, sepContractAddress, wrapEthAbi, wagmiContractAbiConfig } from '../config';
import { wagmiConfig } from '../providers';

export const abiConfig = [
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    type: 'function',
    name: 'transferFrom',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    constant: false,
    inputs: [
      // { name: 'sender', type: 'address' },
      // { name: 'recipient', type: 'address' },
      // { name: 'amount', type: 'uint256' },
    ],
    name: "deposit",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  }
] as const

export const useDeposit = (inputBalance) => {
  const { address, chain } = useAccount();
  const accAddress = address ?? '0xe35e05313CB010E174Dd6C85b9F274180a25524b'

  const debouncedValue = useDebounce(inputBalance, 500);

  const simulateContract = useSimulateContract({
    abi: abiConfig,
    address: sepContractAddress,
    functionName: 'deposit',
    account: accAddress,
    value: BigInt(parseEther(debouncedValue?.toString() || '0')),
  } as UseSimulateContractParameters);

  const { writeContract: writeDeposit, ...depositResponse } = useWriteContract();
  const transactionReceipt = useWaitForTransactionReceipt({ hash: depositResponse?.data });

  return {
    simulateContract,
    writeDeposit,
    depositResponse,
    transactionReceipt,
  };
};
