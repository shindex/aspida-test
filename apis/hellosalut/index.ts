import { Greeting } from '~/apis/@types'

export type Methods = {
  get: {
    query: {
      lang: string 
    }
    resBody: Greeting
  }
}