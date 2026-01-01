

<template>
  <div class="dashboard">
    <Sidebar @navigate="currentView = $event" />
    <div class="content">
      <div class="top-bar">
        <h2>Welcome, {{ user?.name }}</h2>
        <div class="actions">
          <button
            @click="toggleNotification"
            :class="{ 'big-bell': hasNewStatus }"
          >
            🔔
            <span v-if="hasNewStatus" class="dot"></span>
          </button>
         <button class="logout-btn" @click="logout">Logout</button>

        </div>
      </div>

      <div v-if="showNotification" class="notification-panel">
        <p>
          <strong>KYC Status:</strong>
          <span :class="statusClass">{{ user?.kycStatus || 'Pending' }}</span>
        </p>
      </div>

      <component :is="components[currentView]" :user="user" />
    </div>
  </div>
</template>

<script setup>

import Welcome from '../components/Welcome.vue'

import { ref, computed, onMounted } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import About from '../components/About.vue'
import UpdateKYC from '../components/UpdateKYC.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import DownloadKYC from '../components/DownloadKYC.vue'

const currentView = ref('Welcome')
const components = { Welcome, About, UpdateKYC, DownloadKYC }


const user = ref(null)
const showNotification = ref(false)
const hasNewStatus = ref(false)
const router = useRouter()

onMounted(() => {
  setTimeout(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/dashboard/customer', {
        withCredentials: true
      })

      if (response.data.success) {
        user.value = response.data.user

        if (['Approved', 'Rejected'].includes(user.value.kycStatus)) {
          hasNewStatus.value = true
        }
      } else {
        throw new Error('Unauthorized')
      }
    } catch (err) {
      console.error('Session check failed:', err)
      router.push('/')
    }
  }, 300)
})

const toggleNotification = () => {
  showNotification.value = !showNotification.value
  hasNewStatus.value = false
}

const logout = async () => {
  try {
    //await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true })
    await axios.post('/api/logout', {}, { withCredentials: true })
    router.push('/')
  } catch (err) {
    console.error('Logout failed:', err)
    alert('Logout failed')
  }
}

const statusClass = computed(() => {
  const status = user.value?.kycStatus || 'Pending'
  return {
    Approved: 'status-approved',
    Rejected: 'status-rejected',
    Pending: 'status-pending'
  }[status] || 'status-pending'
})
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #aad2f8;
  width: 100%;
  overflow-x: hidden;

  
}

.content {
  flex: 1;
  padding: 20px;
  min-height: 100vh;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}


.actions {
  display: flex;
  gap: 10px;
  position: relative;
}

.notification-panel {
  background-color: #fdfeff; 
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  text-align: left;
}

.status-approved {
  color: green;
  font-weight: bold;
}

.status-rejected {
  color: red;
  font-weight: bold;
}

.status-pending {
  color: orange;
  font-weight: bold;
}

.big-bell {
  font-size: 28px;
  position: relative;
  transition: font-size 0.3s ease;
}

.dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}
.logout-btn {
  background-color: #e74c3c;
  
}

</style> 



























<!-- 

<template>
  <div class="dashboard">
   
    <Sidebar @navigate="currentView = $event" />

    
    <div class="content">
    
      <div class="top-bar">
        <h2>Welcome, {{ user?.name }}</h2>
        <div class="actions">
          <button
            @click="toggleNotification"
            :class="{ 'big-bell': hasNewStatus }"
          >
            🔔
            <span v-if="hasNewStatus" class="dot"></span>
          </button>
          <button class="logout-btn" @click="logout">Logout</button>
        </div>
      </div>

      
      <div v-if="showNotification" class="notification-panel">
        <p>
          <strong>KYC Status:</strong>
          <span :class="statusClass">{{ user?.kycStatus || 'Pending' }}</span>
        </p>
      </div>

      
      <component :is="components[currentView]" :user="user" />
    </div>
  </div>
</template>

<script setup>
import Welcome from '../components/Welcome.vue'
import Sidebar from '../components/Sidebar.vue'
import About from '../components/About.vue'
import UpdateKYC from '../components/UpdateKYC.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const currentView = ref('Welcome')
const components = { Welcome, About, UpdateKYC }

const user = ref(null)
const showNotification = ref(false)
const hasNewStatus = ref(false)
const router = useRouter()

onMounted(() => {
  setTimeout(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/dashboard/customer', {
        withCredentials: true
      })

      if (response.data.success) {
        user.value = response.data.user

        if (['Approved', 'Rejected'].includes(user.value.kycStatus)) {
          hasNewStatus.value = true
        }
      } else {
        throw new Error('Unauthorized')
      }
    } catch (err) {
      console.error('Session check failed:', err)
      router.push('/')
    }
  }, 300)
})

const toggleNotification = () => {
  showNotification.value = !showNotification.value
  hasNewStatus.value = false
}

const logout = async () => {
  try {
    await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true })
    router.push('/')
  } catch (err) {
    console.error('Logout failed:', err)
    alert('Logout failed')
  }
}

const statusClass = computed(() => {
  const status = user.value?.kycStatus || 'Pending'
  return {
    Approved: 'status-approved',
    Rejected: 'status-rejected',
    Pending: 'status-pending'
  }[status] || 'status-pending'
})
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #A3BFD9; /* Ashy Blue */
}

.content {
  flex: 1;
  padding: 20px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  gap: 10px;
  position: relative;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.logout-btn:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.notification-panel {
  background-color: #f0f8ff;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  text-align: left;
}

.status-approved {
  color: green;
  font-weight: bold;
}

.status-rejected {
  color: red;
  font-weight: bold;
}

.status-pending {
  color: orange;
  font-weight: bold;
}

.big-bell {
  font-size: 28px;
  position: relative;
  transition: font-size 0.3s ease;
}

.dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}
</style> -->
