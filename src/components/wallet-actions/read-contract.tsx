import { type BaseError, useReadContract, useAccount, useReadContracts } from 'wagmi'
import { contractAbiConfig, wagmiContractAbiConfig, sepContractAddress } from "@/shared/config";
import { getAccount } from 'wagmi/actions';
import { erc20Abi } from 'viem';

export const ReadContract = () => {
  const { address } = useAccount();
  const accAddress = address ?? '0xe35e05313CB010E174Dd6C85b9F274180a25524b'

  const { data: balance, error, isLoading, isSuccess, isPending } = useReadContract({
    address: sepContractAddress,
    abi: wagmiContractAbiConfig,
    functionName: 'balanceOf',
    args: [accAddress],
  });

  // console.log('debug-ReadContract00', balance, isLoading, isPending, error);

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
  // console.log('debug-ReadContract-11', result.data);

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