import type { History } from '~/models/history'
import type { Parsed } from '~/models/parsed'
import type { Node } from '~/models/node'
import { readFile } from '~/utils/readFile'
import { getSongId } from '~/utils/getSongId'

const updateKeyCount = (key: string, object: Record<string, number>, count: number = 1) => {
  object[key] = (object[key] || 0) + count
}

const updateNodeSong = (node: Node, history: History, songId: string) => {
  updateKeyCount(songId, node.songListenCounts)
  updateKeyCount(history.master_metadata_album_album_name, node.albumListenCounts)

  const mostListenedSongId = getSongId(node.mostListenedSong)
  if (!mostListenedSongId) return

  if (node.songListenCounts[songId]! > node.songListenCounts[mostListenedSongId]!) {
    node.mostListenedSong = history
  }

  const mostListenedAlbumName = node.mostListenedAlbum?.master_metadata_album_album_name
  if (!mostListenedAlbumName) {
    node.mostListenedAlbum = history
  } else if (node.albumListenCounts[history.master_metadata_album_album_name]! > node.albumListenCounts[mostListenedAlbumName]!) {
    node.mostListenedAlbum = history
  }
}

onmessage = async (event: MessageEvent<{ fileList: File[] }>) => {
  const result: Parsed = {
    history: [],
    historyByTrackId: {},
    counts: {
      skip: {},
      listen: {},
      listenAlbum: {},
      listenArtist: {},
      totalMsPlayed: {},
      incognito: 0,
      offline: 0,
      shuffle: 0,
      total: 0,
    },
    dates: {},
    reasons: {
      start: {},
      end: {},
    },
  }

  for (let index = 0; index < event.data.fileList.length; index++) {
    const file = event.data.fileList.at(index)
    if (!file) continue

    const parsedList = await readFile<History[]>(file)

    for (let index = 0; index < parsedList.length; index++) {
      const history = parsedList[index]
      if (!history) continue

      const songId = getSongId(history)
      if (!songId) continue

      result.historyByTrackId[songId] = history

      if (history.skipped) {
        updateKeyCount(songId, result.counts.skip)
      }

      if (history.incognito_mode) {
        result.counts.incognito += 1
      }

      if (history.offline) {
        result.counts.offline += 1
      }

      if (history.shuffle) {
        result.counts.shuffle += 1
      }

      const albumName = history.master_metadata_album_album_name
      const artistName = history.master_metadata_album_artist_name

      if (!result.counts.listenAlbum[albumName]) {
        result.counts.listenAlbum[albumName] = {
          count: 0,
          length: 0,
        }
      }

      if (!result.counts.listenArtist[artistName]) {
        result.counts.listenArtist[artistName] = {
          count: 0,
          length: 0,
        }
      }

      result.counts.listenAlbum[albumName]!.count = (result.counts.listenAlbum[albumName]!.count || 0) + 1
      result.counts.listenAlbum[albumName]!.length = (result.counts.listenAlbum[albumName]!.length || 0) + history.ms_played

      result.counts.listenArtist[artistName]!.count = (result.counts.listenArtist[artistName]!.count || 0) + 1
      result.counts.listenArtist[artistName]!.length = (result.counts.listenArtist[artistName]!.length || 0) + history.ms_played

      updateKeyCount(songId, result.counts.listen)
      updateKeyCount(songId, result.counts.totalMsPlayed, history.ms_played)
      updateKeyCount(history.reason_start, result.reasons.start)
      updateKeyCount(history.reason_end, result.reasons.end)

      const date = new Date(history.ts)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()

      if (!result?.dates[songId]) {
        result.dates[songId] = { date, history }
      }

      const targetDate = result.dates[songId]?.date
      if (targetDate && date < targetDate) {
        result.dates[songId] = { date, history }
      }

      const historyYear = result.history.find(h => h.id === year)
      if (!historyYear) {
        result.history.push({
          id: year,
          label: 'Year',
          nodes: [],
          totalMs: 0,
          type: 'year',
          albumListenCounts: {},
          songListenCounts: {},
          mostListenedSong: history,
        })
      } else {
        historyYear.totalMs += history.ms_played

        updateNodeSong(historyYear, history, songId)
      }

      const historyMonth = historyYear?.nodes.find(h => h.id === month)
      if (!historyMonth) {
        historyYear?.nodes.push({
          id: month,
          label: 'Month',
          nodes: [],
          totalMs: 0,
          type: 'month',
          albumListenCounts: {},
          songListenCounts: {},
          mostListenedSong: history,
        })
      } else {
        historyMonth.totalMs += history.ms_played

        updateNodeSong(historyMonth, history, songId)
      }

      const historyDay = historyMonth?.nodes.find(m => m.id === day)
      if (!historyDay) {
        historyMonth?.nodes.push({
          id: day,
          label: 'Day',
          nodes: [],
          totalMs: 0,
          type: 'day',
          albumListenCounts: {},
          songListenCounts: {},
          mostListenedSong: history,
        })
      } else {
        historyDay.totalMs += history.ms_played

        updateNodeSong(historyDay, history, songId)
      }
    }

    result.counts.total += parsedList.length
  }

  postMessage(result)
}
