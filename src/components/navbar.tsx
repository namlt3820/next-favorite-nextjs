'use client'

import { ShieldCheck, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { LoginForm } from '@/components/login-form'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { TRY_AGAIN } from '@/lib/messages'
import { useAuth } from '@/providers/Auth'

export const Navbar = () => {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const onLogoutClick = async () => {
    try {
      await logout()
      toast({
        title: 'Logged out successfully',
      })
      router.push('/')
    } catch (_) {
      toast({
        title: 'Logged out failed',
        description: TRY_AGAIN,
      })
    }
  }

  return (
    <nav className="fixed inset-x-0 top-0 border-b border-gray-200 bg-white shadow-sm z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-semibold">Next Favorite</div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className="hover:text-gray-600 text-sm font-medium"
              >
                Home
              </Link>
            </li>

            {user ? (
              <li>
                <span
                  className="hover:text-gray-600 text-sm font-medium cursor-pointer"
                  onClick={onLogoutClick}
                >
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span className="hover:text-gray-600 text-sm font-medium cursor-pointer">
                        Sign Up
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer">
                          <Link href={'/account/create'} className="flex">
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Sign Up</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Link href={'/account/verify'} className="flex">
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            <span>Confirmation Code</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  <Popover>
                    <PopoverTrigger asChild>
                      <span className="hover:text-gray-600 text-sm font-medium cursor-pointer">
                        Login
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-96">
                      <LoginForm />
                    </PopoverContent>
                  </Popover>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
