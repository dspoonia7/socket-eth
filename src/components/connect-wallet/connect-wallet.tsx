import { useAccount } from 'wagmi'
import { WalletOptions } from '../wallet-options'
import { Account } from '../account'

export const ConnectWallet = () => {
    const { isConnected } = useAccount()

    if (isConnected) return <Account />

    return <WalletOptions />
  }