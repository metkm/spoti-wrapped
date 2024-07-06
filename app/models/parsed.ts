import type { History } from './history'
import type { Node } from './node'

export interface MostListened {
  count: number
  length: number
}

interface Counts {
  skip: Record<string, number>
  listen: Record<string, number>
  listenAlbum: Record<string, MostListened>
  listenArtist: Record<string, MostListened>
  totalMsPlayed: Record<string, number>
  incognito: number
  shuffle: number
  offline: number
  total: number
}

export interface Reasons {
  start: Record<string, number>
  end: Record<string, number>
}

export interface Parsed {
  history: Node[]
  historyByTrackId: Record<string, History>
  counts: Counts
  dates: Record<string, { date: Date, history: History }>
  reasons: Reasons
}

type FilteredKeys<O, E> = {
  [Key in keyof O]: O[Key] extends E ? Key : never
}[keyof O]

export type Filter = FilteredKeys<Counts, Record<string, number>>
export type FilterOption = {
  value: Filter
  label: string
}
