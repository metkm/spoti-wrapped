export interface Pagination<T> {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
  items: T[]
}
