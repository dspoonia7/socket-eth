import { useAccount, useBalance, useDisconnect, useEnsName } from 'wagmi'
import { formatUnits } from "viem";
import clsx from 'clsx';

export function Account() {
  const { address, chain, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: ensName } = useEnsName({ address })

  if (!isConnected || !chain) return null;

  return (
    <div className="grid max-w-5xl w-full mb-0 grid-cols-4 text-left mt-3">
      <AccountTile 
        title="Wallet address"
        value={middleEllipsis(address as string, 9) || ""}
      />
      <AccountTile 
        title="Network"
        value={chain?.name || ""}
      />
      <AccountTile 
        title="Balance"
        value={balance ? (
          <div>
            {Number(formatUnits(balance.value, balance.decimals)).toFixed(4)}{" "}
            {balance.symbol}
          </div>
        ) : (
          <div />
        )}
      />
      <AccountTile 
        title="EnsName"
        value={ensName || ""}
        valueClassName='text-balance'
      />
    </div>
  )
}

const AccountTile = ({ title, titleClassName, value, valueClassName }: { title: React.ReactNode, titleClassName?: string, value: React.ReactNode, valueClassName?: string }) => {
  return (
    <div className="group rounded-lg border border-transparent px-4 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <h3 className={clsx('mb-2 text-base font-semibold', titleClassName)}>{title}</h3>
      <div className={clsx('m-0 max-w-[30ch] text-sm opacity-50 text-balance', valueClassName)}>
        {value}
      </div>
    </div>
  )
}

const middleEllipsis = (str: string, len: number) => {
  if (!str) return '';
  return `${str.substr(0, len)}...${str.substr(str.length - len, str.length)}`;
};