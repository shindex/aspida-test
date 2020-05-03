/* eslint-disable */
import { AspidaClient } from 'aspida'
import { Methods as Methods0 } from './hellosalut/index'

const api = <T>(client: AspidaClient<T>) => {
  const prefix = (client.baseURL === undefined ? '' : client.baseURL).replace(/\/$/, '')

  return {
    hellosalut: {
      get: (option: { query: Methods0['get']['query'], config?: T }) =>
        client.fetch<Methods0['get']['resBody']>(prefix, '/hellosalut/', 'GET', option).json(),
      $get: async (option: { query: Methods0['get']['query'], config?: T }) =>
        (await client.fetch<Methods0['get']['resBody']>(prefix, '/hellosalut/', 'GET', option).json()).data
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
