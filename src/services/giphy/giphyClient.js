import axios from 'axios'

const giphyClient = axios.create({
  baseURL: '/giphy-api/v1/gifs',
  params: {
    api_key: import.meta.env.VITE_GIPHY_API_KEY
  }
})

export default giphyClient
