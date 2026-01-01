
<template>
  <div class="download-kyc">
    <header class="header">
      <h2>Download KYC</h2>
      <p class="subtext">
        View and download your submitted KYC documents securely.
      </p>
    </header>

    <!-- Controls -->
    <div class="controls">
      <div class="filters">
        <label>
          Type:
          <select v-model="filters.type" @change="applyFilters">
            <option value="">All</option>
            <option v-for="t in uniqueTypes" :key="t" :value="t">{{ t }}</option>
          </select>
        </label>

        <label>
          Status:
          <select v-model="filters.status" @change="applyFilters">
            <option value="">All</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>

        <label class="search">
          <input
            type="text"
            v-model="filters.query"
            @input="applyFilters"
            placeholder="Search by name or type..."
            aria-label="Search KYC documents"
          />
        </label>
      </div>

      <div class="actions">
        <button
          class="btn"
          @click="refresh"
          :disabled="loading"
          title="Refresh list"
          aria-label="Refresh list"
        >
          🔄 Refresh
        </button>

        <button
          class="btn primary"
          @click="downloadAll"
          :disabled="loading || filteredDocs.length === 0"
          title="Download all documents as ZIP"
          aria-label="Download all documents"
        >
          ⬇️ Download All
        </button>
      </div>
    </div>

    <!-- States -->
    <div v-if="loading" class="loading">
      <div class="skeleton-row" v-for="i in 3" :key="i"></div>
    </div>

    <div v-else-if="error" class="error">
      <p>⚠️ {{ error }}</p>
      <button class="btn" @click="refresh">Try again</button>
    </div>

    <!-- List -->
    <div v-else>
      <div v-if="filteredDocs.length === 0" class="empty">
        <p>No KYC documents found for the selected filters.</p>
      </div>

      <ul class="doc-list">
        <li v-for="doc in filteredDocs" :key="doc.id" class="doc-item">
          <div class="left">
            <h4 class="name">{{ doc.name }}</h4>
            <p class="meta">
              <span class="badge" :class="statusClass(doc.status)">{{ doc.status }}</span>
              <span class="type">{{ doc.type }}</span>
              <span class="date">Updated: {{ formatDate(doc.updatedAt) }}</span>
              <span class="size">{{ formatSize(doc.size) }}</span>
            </p>
          </div>

          <div class="right">
            <button
              class="btn"
              @click="previewDoc(doc)"
              title="Preview document"
              aria-label="Preview document"
            >
              👁️ Preview
            </button>

            <button
              class="btn primary"
              @click="downloadDoc(doc)"
              title="Download document"
              aria-label="Download document"
            >
              ⬇️ Download
            </button>
          </div>
        </li>
      </ul>
    </div>

    <footer class="footer">
      <small>
        Dummy mode enabled: actions are simulated without backend. Switch to API mode later by replacing
        <code>refresh</code>, <code>downloadDoc</code>, and <code>downloadAll</code> with real calls.
      </small>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// --- State
const loading = ref(false)
const error = ref('')
const docs = ref([])
const filteredDocs = ref([])
const filters = ref({
  type: '',
  status: '',
  query: ''
})

// --- Lifecycle
onMounted(() => {
  refresh() // load dummy data
})

// --- Computed
const uniqueTypes = computed(() => {
  const set = new Set(docs.value.map(d => d.type).filter(Boolean))
  return Array.from(set)
})

// --- Helpers
const statusClass = (status) => {
  return {
    Approved: 'status-approved',
    Rejected: 'status-rejected',
    Pending: 'status-pending'
  }[status] || 'status-pending'
}

const applyFilters = () => {
  const { type, status, query } = filters.value
  const q = (query || '').toLowerCase()

  filteredDocs.value = docs.value.filter(d => {
    const matchesType = type ? d.type === type : true
    const matchesStatus = status ? d.status === status : true
    const matchesQuery =
      q
        ? (d.name?.toLowerCase().includes(q) ||
           d.type?.toLowerCase().includes(q))
        : true
    return matchesType && matchesStatus && matchesQuery
  })
}

// --- Dummy implementations (no axios, no backend)

// Loads mock data and simulates latency
const refresh = async () => {
  loading.value = true
  error.value = ''
  try {
    await new Promise(resolve => setTimeout(resolve, 400)) // simulate API delay

    docs.value = [
      {
        id: 1,
        name: 'PAN Card',
        type: 'Identity',
        status: 'Approved',
        updatedAt: '2025-12-20T09:30:00Z',
        size: 23456,
        fileUrl: '#'
      },
      {
        id: 2,
        name: 'Aadhaar Card',
        type: 'Identity',
        status: 'Pending',
        updatedAt: '2025-12-18T12:15:00Z',
        size: 34567,
        fileUrl: '#'
      },
      {
        id: 3,
        name: 'Address Proof',
        type: 'Address',
        status: 'Rejected',
        updatedAt: '2025-12-15T16:00:00Z',
        size: 45678,
        fileUrl: '#'
      }
    ]
    applyFilters()
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load dummy data.'
  } finally {
    loading.value = false
  }
}

// Simulate per-document download
const downloadDoc = async (doc) => {
  // Optional: simulate time
  await new Promise(resolve => setTimeout(resolve, 200))
  // No actual download; just a friendly message
  alert(`Pretend downloading: ${doc.name}`)
}

// Simulate ZIP download for all filtered docs
const downloadAll = async () => {
  if (filteredDocs.value.length === 0) return
  await new Promise(resolve => setTimeout(resolve, 300))
  alert(`Pretend downloading ZIP for ${filteredDocs.value.length} document(s)`)
}

// Preview simulation
const previewDoc = (doc) => {
  alert(`Pretend previewing: ${doc.name}`)
}

// Formatting helpers
const formatDate = (iso) => {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch {
    return iso
  }
}

const formatSize = (bytes) => {
  if (!bytes && bytes !== 0) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let n = bytes
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024
    i++
  }
  return `${n.toFixed(1)} ${units[i]}`
}
</script>

<style scoped>
.download-kyc {
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e5e7eb;
}

.header {
  margin-bottom: 12px;
}
.subtext {
  margin-top: 4px;
  color: #556170;
  font-size: 0.95rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.filters {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.filters label {
  display: flex;
  gap: 6px;
  align-items: center;
}
.search input {
  padding: 6px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

.actions {
  display: flex;
  gap: 8px;
}

.loading .skeleton-row {
  height: 56px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 37%, #f3f4f6 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 8px;
  margin-bottom: 8px;
}
@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.error {
  background: #fff7ed;
  border: 1px solid #f59e0b;
  color: #9a3412;
  padding: 12px;
  border-radius: 8px;
}

.empty {
  text-align: center;
  color: #6b7280;
  padding: 20px 8px;
}

.doc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.doc-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  background: #f9fafb;
}
.name {
  margin: 0 0 4px 0;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.875rem;
  color: #4b5563;
}
.badge {
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 600;
}
.status-approved { background: #e9fce9; color: #166534; }
.status-rejected { background: #fee2e2; color: #991b1b; }
.status-pending  { background: #fff7ed; color: #9a3412; }

.right {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
}
.btn:hover { background: #f3f4f6; }
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.primary {
  background: #2563eb;
  border-color: #1d4ed8;
  color: #ffffff;
}
.btn.primary:hover {
  background: #1e40af;
}

.footer {
  margin-top: 16px;
  color: #6b7280;
}
</style>
