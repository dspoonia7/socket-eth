import { type BaseError, useReadContract, useAccount, useReadContracts } from 'wagmi'
import { wagmiContractAbiConfig, sepContractAddress, accountAddress } from "@/shared/config";
import { erc20Abi } from 'viem';

export const ReadContract = () => {
  const { address } = useAccount();
  const accAddress = address ?? accountAddress;

  const { data: balance, error, isLoading, isSuccess, isPending } = useReadContract({
    address: sepContractAddress,
    abi: wagmiContractAbiConfig,
    functionName: 'balanceOf',
    args: [accAddress],
  });

  // console.log('useReadContract.1', balance, isLoading, isPending, error);

  const result = useReadContracts({ 
    allowFailure: false, 
    contracts: [ 
      { 
        address: sepContractAddress, 
        abi: erc20Abi, 
        functionName: 'balanceOf', 
        args: [accAddress], 
      }, 
      { 
        address: sepContractAddress, 
        abi: erc20Abi, 
        functionName: 'decimals', 
      }, 
      { 
        address: sepContractAddress, 
        abi: erc20Abi, 
        functionName: 'symbol', 
      }, 
    ] 
  })

  if (isPending) return <div>Loading...</div>

  if (error)
    return (
      <div>
        Error: {(error as BaseError).shortMessage || error.message}
      </div>
    )

  return (
    <div>Balance: {balance?.toString()}</div>
  )
}