import { AddFavoriteButton } from '@/components/add-favorite'
import { AddIgnoreButton } from '@/components/add-ignore'
import { CardFooter } from '@/components/ui/card'
import { Anime } from '@/types/JikanAnime'

export const JikanAnimeSearchAction = ({ anime }: { anime: Anime }) => {
  const { mal_id } = anime

  return (
    <CardFooter className="flex justify-between mt-auto">
      <AddIgnoreButton keywords={['jikan', 'anime']} itemId={mal_id} />
      <AddFavoriteButton keywords={['jikan', 'anime']} itemId={mal_id} />
    </CardFooter>
  )
}
