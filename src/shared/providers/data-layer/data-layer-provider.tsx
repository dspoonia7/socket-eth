import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

import { queryClient } from './query-client'


export const DataLayerProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}