<template>
  <table>
    <thead>
      <tr>
        <th>country code</th>
        <th>greeting</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="greeting in greetings" :key="greeting.code">
        <td>{ greeting.code  }</td>
        <td>{ greeting.hello }</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { Greeting } from '~/apis/@types'

export default Vue.extend({
  data() {
    return {
      greetings: [] as Greeting[]
    }
  },
  
  async asyncData({ app }) {
    let langs = [ 'en', 'zh', 'de', 'fr', 'ja' ]

    this.greetings = await Promise.all(langs.map(async lang => {
      const res = await $nuxt.$api.hellosalut.$get({ query: { lang: 'ja' } })
      res.hello = res.hello.startsWith('&#')
                ? String.fromCharCode(
                    ...res.hello
                      .slice(2, -1)
                      .split(';&#')
                      .map((n) => +n)
                  )
                : res.hello
      return res
    }))
  }
})
</script>