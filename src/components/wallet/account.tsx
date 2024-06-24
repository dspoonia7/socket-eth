import { useAccount, useBalance, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { formatUnits } from "viem";
import clsx from 'clsx';

export function Account() {
  const { address, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  return (
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      <AccountTile 
        title="Wallet address"
        value={middleEllipsis(address as string, 12) || ""}
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
        value={ensName || ensAvatar || ""}
        valueClassName='text-balance'
      />
    </div>
  )
}

const AccountTile = ({ title, titleClassName, value, valueClassName }: { title: React.ReactNode, titleClassName?: string, value: React.ReactNode, valueClassName?: string }) => {
  return (
    <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <h2 className={clsx('mb-3 text-2xl font-semibold', titleClassName)}>{title}</h2>
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