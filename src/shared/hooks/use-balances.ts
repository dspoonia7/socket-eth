import { useAccount, useBalance } from 'wagmi';
import { accountAddress, networkAddressMap, sepContractAddress } from '../config';

export const useBalances = () => {
  const { address } = useAccount();
  const accAddress = address ?? accountAddress;

  const getEthBalance = useBalance({
    address: accAddress,
    query: { enabled: sepContractAddress?.length !== 0 },
  });

  const getWethBalance = useBalance({ 
    address: accAddress,
    query: { enabled: sepContractAddress?.length !== 0 },
    token: sepContractAddress, 
  });

  const ethBalance = getEthBalance.data?.formatted || '0';
  const wethBalance = getWethBalance.data?.formatted || '0';

  return { ethBalance, wethBalance };
};
