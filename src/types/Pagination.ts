export type IPagination<T> = {
  docs: T[]
  page: number
  limit: number
  pageCount: number
  itemCount: number
}
