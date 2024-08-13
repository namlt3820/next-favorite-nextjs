import { Metadata } from 'next'

export function constructMetadata({
  title = 'NextFavorite - All Your Entertainment, One Search',
  description = 'NextFavorite is your go-to source for finding and exploring entertainment media. Use our search features to build and expand your favorite list with movies, TV shows, anime, and more!',
  image = '/homepage_1.jpg',
  icons = '/icon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    metadataBase: new URL('http://localhost:3000/'),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    icons,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: '',
  title: '',
  description: 'Your source of honest company reviews.',
  images: [
    {
      url: 'http://localhost:3000/',
    },
  ],
}

export const mergeOpenGraph = (
  og?: Metadata['openGraph']
): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
