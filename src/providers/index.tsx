'use client'

import { ReactQueryProvider } from '@/providers/QueryClient'
import React from 'react'

export type ProvidersProps = {
  children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
