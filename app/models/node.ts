import type { History } from './history'

export interface Node {
  id: number | string
  label: string
  nodes: Node[]
  mostListenedSong: History
  mostListenedAlbum?: History
  songListenCounts: Record<string, number>
  albumListenCounts: Record<string, number>
  type: 'year' | 'month' | 'day'
  totalMs: number
}
