import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface PageLayoutProps {
  className?: string;
}

export const PageLayout = ({ className, children }: PropsWithChildren<PageLayoutProps>) => {
  return (
    <main className={clsx('min-h-screen flex flex-col items-center justify-between p-24 font-mono', className)}>
      {children}
    </main>
  );
};
