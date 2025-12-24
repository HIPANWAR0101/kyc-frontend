// import { defineConfig } from 'vitest/config'
// import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [vue()],
//   test: {
//     environment: 'jsdom',
//     globals: true,
//     setupFiles: './vitest.setup.js'
//   }
// })




import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    include: ['tests/unit/**/*.spec.js']
  }
})
