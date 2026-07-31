import giphyClient from './giphyClient'

export async function fetchTrendingGifs({ limit = 25, offset = 0 } = {}) {
  const { data } = await giphyClient.get('/trending', {
    params: { limit, offset }
  })
  return data
}

export async function searchGifs(query, { limit = 25, offset = 0 } = {}) {
  const { data } = await giphyClient.get('/search', {
    params: { q: query, limit, offset }
  })
  return data
}
