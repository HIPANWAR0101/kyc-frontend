// vitest.setup.js

import { vi } from 'vitest'

// Mock global alert to prevent actual popups during tests
global.alert = vi.fn()

// setupTests.js or vitest.setup.js
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver

// You can also mock other global APIs or setup test utilities here
