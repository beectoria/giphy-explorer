import giphyClient from './giphyClient'

// Busca os GIFs em alta (trending)
export async function fetchTrendingGifs({ limit = 25, offset = 0 } = {}) {
  const { data } = await giphyClient.get('/trending', { params: { limit, offset } })
  return data
}

// Busca GIFs por termo digitado
export async function searchGifs(query, { limit = 25, offset = 0 } = {}) {
  const { data } = await giphyClient.get('/search', { params: { q: query, limit, offset } })
  return data
}