import App from './App.svelte'
import { install } from '@twind/core'
import config from './twind.config'

install(config)

const app = new App({
  target: document.getElementById('app'),
})

export default app
