'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CreateUserParams, createUser } from '@/api/auth/createUser'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
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

const formSchema = z.object({
  username: z.string().max(50).min(1),
  password: z.string().min(8),
  email: z.string().email(),
})

export default function CreateAccount() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const createAccountMutation = useMutation({
    mutationFn: (params: CreateUserParams) => createUser(params),
    onError: (error) => {
      toast({
        title: error.message || 'Error',
        description: TRY_AGAIN,
      })
    },
    onSuccess: () => {
      const values = form.getValues()

      setTimeout(() => {
        router.push(
          `/account/verify?username=${encodeURIComponent(values.username)}`
        )
      }, 500)
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await createAccountMutation.mutate(data)
    form.reset()
  }

  return (
    <SectionWrapper backgroundColor="bg-white">
      <SectionHeader title={'Create A New Account'} />
      <div className="mx-auto w-full max-w-lg space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">{'Name'} (*)</Label>
                      <Input
                        id="name"
                        placeholder={'Required. Max 50 characters.'}
                        {...field}
                        autoComplete="name"
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">{'Email'} (*)</Label>
                      <Input
                        id="email"
                        placeholder={'Required.'}
                        {...field}
                        autoComplete="email"
                      />
                      <FormMessage />
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
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password">{'Password'} (*)</Label>
                      <Input
                        id="password"
                        placeholder={'Required.'}
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit">{'Create Account'}</Button>
            </div>
            {createAccountMutation.status === 'success' ? (
              <p className="text-center">
                {
                  'Account created successfully. Please check your email inbox to get the confirmation code.'
                }
              </p>
            ) : null}
          </form>
        </Form>
      </div>
    </SectionWrapper>
  )
}
