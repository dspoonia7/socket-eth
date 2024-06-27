import { formatUnits } from 'viem';
import { useAccount, useEstimateFeesPerGas, useFeeData } from 'wagmi';

export const useTransactionFee = () => {
  const { chain } = useAccount();
  const { data } = useEstimateFeesPerGas({
    chainId: chain?.id,
  });
  const gasPrice = data?.gasPrice ?? 0;

  const gasUsedByChain: { [key: number]: number} = {
    1: 50000, // Ethereum
    100: 70000, // Gnosis
    137: 50000, // Polygon
    42161: 100000, // Arbitrum One
    10: 50000, // OP Mainnet
    5: 50000, // Goerli
    11155111: 85000, // Sepolia
    168587773: 50000, // Blast Sepolia
  };

  const estimatedGasUsed = chain?.id ? gasUsedByChain[chain.id] : 0;

  const txFeeWei = BigInt(gasPrice) * BigInt(estimatedGasUsed);
  const txFeeEther = formatUnits(txFeeWei, 18) || 0;

  return { txFeeEther };
};
