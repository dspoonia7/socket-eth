import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface PageLayoutProps {
  className?: string;
}

export const PageLayout = ({ className, children }: PropsWithChildren<PageLayoutProps>) => {
  return (
    <main className={clsx('flex flex-col items-center justify-center p-20 font-mono w-screen h-screen', className)}>
      {children}
    </main>
  );
};
