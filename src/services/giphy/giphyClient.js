import axios from 'axios'

const giphyClient = axios.create({
  baseURL: '/giphy-api/v1/gifs'
})

giphyClient.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    api_key: import.meta.env.QCLI_GIPHY_API_KEY
  }
  return config
})

export default giphyClient
