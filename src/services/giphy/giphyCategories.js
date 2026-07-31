import giphyClient from './giphyClient'

// Busca a lista de categorias
export async function fetchCategories() {
  const { data } = await giphyClient.get('/categories')
  return data
}

// Busca GIFs de uma categoria específica (reaproveita o /search)
export async function fetchGifsByCategory(subcategoryName, { limit = 25, offset = 0 } = {}) {
  const { data } = await giphyClient.get('/search', {
    params: { q: subcategoryName, limit, offset }
  })
  return data
}