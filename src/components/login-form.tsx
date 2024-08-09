'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { TRY_AGAIN } from '@/lib/messages'
import { useAuth } from '@/providers/Auth'

const formSchema = z.object({
  username: z.string().max(50).min(1),
  password: z.string().min(8),
})

export const LoginForm = () => {
  const { toast } = useToast()
  const { login } = useAuth()
  const [pending, setPending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setPending(true)
      await login(data)
      toast({
        title: 'Logged in successfully.',
      })
      setPending(false)
    } catch (error) {
      setPending(false)
      toast({
        title: 'Logged in failed',
        description: TRY_AGAIN,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="name">{'Name'} (*)</Label>
                  <Input
                    id="username"
                    placeholder={'Required. Max 50 characters.'}
                    {...field}
                    autoComplete="username"
                    className="col-span-2 h-8"
                  />
                  <FormMessage className="col-span-3" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="password">{'Password'} (*)</Label>
                  <Input
                    id="password"
                    placeholder={'Required.'}
                    {...field}
                    className="col-span-2 h-8"
                    type="password"
                  />
                  <FormMessage className="col-span-3" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          {pending ? (
            <Button disabled>
              Please wait
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button type="submit">{'Login'}</Button>
          )}
        </div>
      </form>
    </Form>
  )
}
