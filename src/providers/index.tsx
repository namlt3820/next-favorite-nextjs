'use client'

import React from 'react'

import { AuthProvider } from '@/providers/Auth'
import { ReactQueryProvider } from '@/providers/QueryClient'

export type ProvidersProps = {
  children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  )
}
