'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { getUser } from '@/api//auth/getUser'
import { login as LoginApi, LoginParams } from '@/api/auth/login'
import { User } from '@/types/User'

type AuthContext = {
  login: (args: LoginParams) => void
  logout: () => void
  user: User | null
}

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(
    async (args: LoginParams) => {
      try {
        const isSuccess = await LoginApi(args)

        if (isSuccess) {
          const user = await getUser()
          setUser(user)
        }

        return user
      } catch (e) {
        throw e
      }
    },
    [user]
  )

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem('accessToken')
      setUser(null)
    } catch (e) {
      throw e
    }
  }, [])

  useEffect(() => {
    const getMe = async () => {
      try {
        const user = await getUser()

        if (user) {
          setUser(user)
        }
      } catch (error) {
        setUser(null)
      }
    }

    getMe()
  }, [])

  return (
    <Context.Provider value={{ user, login, logout }}>
      {children}
    </Context.Provider>
  )
}

type UseAuth = () => AuthContext

export const useAuth: UseAuth = () => useContext(Context)
