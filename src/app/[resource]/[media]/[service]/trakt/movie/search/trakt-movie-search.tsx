'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { TraktMovieSearchAction } from '@/app/[resource]/[media]/[service]/trakt/movie/search/trakt-movie-search-action'
import { TraktMovieSearchPagination } from '@/app/[resource]/[media]/[service]/trakt/movie/search/trakt-movie-search-pagination'
import { TraktMovie } from '@/components/trakt/trakt-movie'
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
import { useSearchTraktMovie } from '@/hooks/useSearchTraktMovie'

const formSchema = z.object({
  query: z.string().max(500),
})

export const TraktMovieSearch = () => {
  const { data, isError, isLoading } = useSearchTraktMovie()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  })

  const onSubmit = async () => {
    router.push(
      `/trakt/movies/search?query=${encodeURIComponent(form.getValues().query)}`
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
          {data?.docs.map((movie) => (
            <TraktMovie
              key={movie.movie.ids.trakt}
              movie={movie}
              actionComponent={<TraktMovieSearchAction movie={movie} />}
            />
          ))}
        </div>
        <TraktMovieSearchPagination data={data} />
      </div>
    </div>
  )
}
