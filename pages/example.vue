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
        <td>{{ greeting.code }}</td>
        <td>{{ greeting.hello }}</td>
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
  
  async fetch() {
    const langs = [ 'en', 'zh', 'de', 'fr', 'ja' ]

    this.greetings = (
      await Promise.all(
        langs.map((lang) => this.$api.hellosalut.$get({ query: { lang } }))
      )
    ).map(({ code, hello }) => ({
      code,
      hello: hello.startsWith('&#')
        ? String.fromCharCode(
            ...hello
              .slice(2, -1)
              .split(';&#')
              .map((n) => +n)
          )
        : hello
    }))
  }
})
</script>