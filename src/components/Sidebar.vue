<!-- 
<template>
  
  <nav
    class="sidebar"
    role="navigation"
    aria-label="Sidebar Menu"
    @mouseover="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <h3 v-if="isExpanded">Menu</h3>
    <ul>

      <li
  v-for="item in menuItems"
  :key="item.label"
  role="menuitem"
  tabindex="0"
  @click="() => { $emit('navigate', item.route); announce(`${item.label} selected`) }"
  @keydown.enter="() => { $emit('navigate', item.route); announce(`${item.label} selected`) }"
  @keydown.space.prevent="() => { $emit('navigate', item.route); announce(`${item.label} selected`) }"
  :aria-label="item.label"
>
  <i :class="item.icon" aria-hidden="true"></i>
  <span v-if="isExpanded">{{ item.label }}</span>
</li>

    </ul>
  </nav>
  <div
  class="sr-only"
  aria-live="polite"
  role="status"
>
  {{ liveMessage }}
</div>

  
</template> 








<script setup>
// import { ref } from 'vue'
import { ref, watch } from 'vue'


const isExpanded = ref(false)

const menuItems = [
  { label: 'Home', route: 'Welcome', icon: 'fas fa-home' },
  { label: 'About', route: 'About', icon: 'fas fa-user-circle' },
  { label: 'Update KYC', route: 'UpdateKYC', icon: 'fas fa-id-card' },
  { label: 'Download PDF', route: '', icon: 'fas fa-file-download' },
  { label: 'KYC History', route: '', icon: 'fas fa-history' },
  { label: 'Notifications', route: '', icon: 'fas fa-bell' },
  { label: 'Settings', route: '', icon: 'fas fa-cog' }
]


const liveMessage = ref('')

function announce(message) {
  liveMessage.value = ''
  setTimeout(() => {
    liveMessage.value = message
  }, 100) // slight delay to ensure screen reader picks it up
}

</script>

<style scoped>
 .sidebar {
  width: 60px;
  transition: width 0.3s ease;
  background: #2c3e50;
  color: white
;
  height: 263vh;
  padding: 20px 10px;
  overflow: hidden;
}
.sidebar:hover {
  width: 200px;
}
.sidebar h3 {
  margin-bottom: 20px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  cursor: pointer;
  margin: 10px 0;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  outline: none;
}
.sidebar li:hover,
.sidebar li:focus {
  background-color: #34495e;
}
.sidebar i {
  font-size: 18px;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
} 



</style> 
 -->





 
<template>
  <nav
    class="sidebar"
    role="navigation"
    aria-label="Sidebar Menu"
    @mouseover="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <h3 v-if="isExpanded">Menu</h3>
    <ul role="menubar">
      <li
        v-for="item in menuItems"
        :key="item.label"
        role="menuitem"
        tabindex="0"
        @click="() => { $emit('navigate', item.route); announce(`${item.label} selected`) }"
        @keydown.enter="() => { $emit('navigate', item.route); announce(`${item.label} selected`) }"
        @keydown.space.prevent="() => { $emit('navigate', item.route); announce(`${item.label} selected`) }"
        :aria-label="item.label"
      >
        <i :class="item.icon" aria-hidden="true"></i>
        <span v-if="isExpanded">{{ item.label }}</span>
      </li>
    </ul>
  </nav>

  <!-- Live region for screen reader announcements -->
  <div
    class="sr-only"
    aria-live="polite"
    role="status"
  >
    {{ liveMessage }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isExpanded = ref(false)
const liveMessage = ref('')

// ✅ Added "Download KYC" with correct route key
const menuItems = [
  { label: 'Home', route: 'Welcome', icon: 'fas fa-home' },
  { label: 'About', route: 'About', icon: 'fas fa-user-circle' },
  { label: 'Update KYC', route: 'UpdateKYC', icon: 'fas fa-id-card' },
  { label: 'Download KYC', route: 'DownloadKYC', icon: 'fas fa-file-download' }, // <-- added
  { label: 'KYC History', route: 'KYCHistory', icon: 'fas fa-history' },       // optional future route
  { label: 'Notifications', route: 'Notifications', icon: 'fas fa-bell' },     // optional future route
  { label: 'Settings', route: 'Settings', icon: 'fas fa-cog' }                  // optional future route
]

// Announce to screen readers
function announce(message) {
  liveMessage.value = ''
  setTimeout(() => {
    liveMessage.value = message
  }, 100)
}
</script>

<style scoped>
.sidebar {
  width: 60px;
  transition: width 0.3s ease;
  background: #2c3e50;
  color: white;
  height: 263vh;
  padding: 20px 10px;
  overflow: hidden;
}
.sidebar:hover {
  width: 200px;
}
.sidebar h3 {
  margin-bottom: 20px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  cursor: pointer;
  margin: 10px 0;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  outline: none;
}
.sidebar li:hover,
.sidebar li:focus {
  background-color: #34495e;
}
.sidebar i {
  font-size: 18px;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>







