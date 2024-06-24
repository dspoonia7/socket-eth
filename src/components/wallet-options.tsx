import clsx from 'clsx';
import Image from 'next/image';
import { useState, useEffect } from 'react'
import { Connector, useConnect } from 'wagmi'

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div className='test'>
      <div>here:</div>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </div>
  )
}

const WalletOption = ({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) => {
  const [isWalletReady, setIsWalletReady] = useState(false)
  const [iconUrl, setIconUrl] = useState('');

  useEffect(() => {
    (async ()=> {
      const provider = await connector.getProvider()
      setIsWalletReady(!!provider)

      const url = await connector.rkDetails?.iconUrl();
      if (url) setIconUrl(url);
    })();
  }, [connector])

  return (
    <div
      className={clsx('flex items-center justify-start gap-3 w-full p-2 hover:bg-white rounded-md cursor-pointer',
        !isWalletReady && 'opacity-40'
      )}
      onClick={onClick}
    >
      <div className='relative w-8 h-8 rounded-md overflow-hidden'>
        {iconUrl && (
          <Image
            alt={connector.rkDetails?.name}
            className="object-contain"
            fill
            loading="lazy"
            src={iconUrl}
          />
        )}
      </div>
      <div>{connector.rkDetails?.name || connector.name}</div>
    </div>
  )
}
