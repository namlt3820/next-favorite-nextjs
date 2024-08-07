'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { VerifyEmailParams, verifyEmail } from '@/api/auth/verifyEmail'
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
  confirmationCode: z.string(),
})

export default function EmailVerification() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = decodeURIComponent(searchParams.get('username') || '')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username,
      confirmationCode: '',
    },
  })

  const verifyEmailMutation = useMutation({
    mutationFn: (params: VerifyEmailParams) => verifyEmail(params),
    onError: (error) => {
      toast({
        title: error.message || 'Error',
        description: TRY_AGAIN,
      })
    },
    onSuccess: () => {
      setTimeout(() => {
        router.push('/')
      }, 500)
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await verifyEmailMutation.mutate(data)
    form.reset()
  }

  return (
    <SectionWrapper backgroundColor="bg-white">
      <SectionHeader title={'Email Verification'} />
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
              name="confirmationCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="confirmationCode">
                        {'Confirmation Code'} (*)
                      </Label>
                      <Input
                        id="confirmationCode"
                        placeholder={'Required.'}
                        {...field}
                        autoComplete="confirmationCode"
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit">{'Verify Email'}</Button>
            </div>
            {verifyEmailMutation.status === 'success' ? (
              <p className="text-center">
                {
                  'Your email has been successfully verified. You will be redirected to the homepage shortly.'
                }
              </p>
            ) : null}
          </form>
        </Form>
      </div>
    </SectionWrapper>
  )
}
