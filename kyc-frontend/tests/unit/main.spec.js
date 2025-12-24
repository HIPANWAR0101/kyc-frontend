import { describe, it, expect } from 'vitest'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

describe('main.js', () => {
  it('mounts the app without crashing', async () => {
    const app = createApp(App)
    app.use(router)

    // Simulate mounting (no actual DOM mount needed)
    expect(() => {
      app.mount(document.createElement('div'))
    }).not.toThrow()
  })
})
