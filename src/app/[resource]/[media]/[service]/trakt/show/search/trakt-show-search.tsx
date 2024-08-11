'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { TraktShowSearchAction } from '@/app/[resource]/[media]/[service]/trakt/show/search/trakt-show-search-action'
import { TraktShowSearchPagination } from '@/app/[resource]/[media]/[service]/trakt/show/search/trakt-show-search-pagination'
import { TraktShow } from '@/components/trakt/trakt-show'
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
import { useSearchTraktShow } from '@/hooks/useSearchTraktShow'

const formSchema = z.object({
  query: z.string().max(500),
})

export const TraktShowSearch = () => {
  const { data, isError, isLoading } = useSearchTraktShow()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  })

  const onSubmit = async () => {
    router.push(
      `/trakt/shows/search?query=${encodeURIComponent(form.getValues().query)}`
    )
  }

  return (
    <div className="flex flex-col gap-7">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-7"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <Label htmlFor="name" className="w-24">
                      {'Title'} (*)
                    </Label>
                    <Input
                      id="title"
                      placeholder={'Required. Max 500 characters.'}
                      {...field}
                      autoComplete="title"
                      className=""
                    />
                    <FormMessage className="" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex gap-2 items-center"
            >
              {isLoading ? (
                <>
                  {' '}
                  Please wait
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                'Search'
              )}
            </Button>
          </div>

          {isError ? (
            <div className="text-center">
              An error occurred while loading trending movies from the Trakt
              API. Please try again later or provide feedback.
            </div>
          ) : null}
        </form>
      </Form>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-4">
          {data?.docs.map((show) => (
            <TraktShow
              key={show.show.ids.trakt}
              show={show}
              actionComponent={<TraktShowSearchAction show={show} />}
            />
          ))}
        </div>
        <TraktShowSearchPagination data={data} />
      </div>
    </div>
  )
}
