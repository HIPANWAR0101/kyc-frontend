
<template>
  <div>
    <div class="top-bar">
      <h2>Customer KYC Requests</h2>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>

    <div class="card-grid">
      <div
        class="customer-card"
        v-for="(customer, index) in customers"
        :key="index"
        @click="openModal(customer, index)"
      >
        <h3>{{ customer.name }}</h3>
        <p>Status: {{ customer.kycStatus || 'Pending' }}</p>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ selectedCustomer.name }}</h2>
        <p><strong>Email:</strong> {{ selectedCustomer.email }}</p>
        <p><strong>Mobile:</strong> {{ selectedCustomer.mobile }}</p>
        <p><strong>Aadhaar:</strong> {{ selectedCustomer.aadhaar }}</p>
        <p><strong>PAN:</strong> {{ selectedCustomer.pan }}</p>

        <div class="documents">
          <p><strong>Documents:</strong></p>
          <a v-if="selectedCustomer.aadhaarFile" :href="selectedCustomer.aadhaarFile" download>Aadhaar</a><br />
          <a v-if="selectedCustomer.panFile" :href="selectedCustomer.panFile" download>PAN</a><br />
          <a v-if="selectedCustomer.addressProof" :href="selectedCustomer.addressProof" download>Address</a><br />
          <a v-if="selectedCustomer.photo" :href="selectedCustomer.photo" download>Photo</a>
        </div>

        <div class="actions">
          <button v-if="selectedCustomer.kycStatus === 'Pending'" @click="updateStatus('Approved')">Approve</button>
          <button v-if="selectedCustomer.kycStatus === 'Pending'" @click="updateStatus('Rejected')">Reject</button>
          <span v-else>{{ selectedCustomer.kycStatus }}</span>
        </div>

        <button class="close-btn" @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const customers = ref([])
const selectedCustomer = ref({})
const selectedIndex = ref(null)
const showModal = ref(false)
const router = useRouter()

onMounted(async () => {
  try {
    //const response = await axios.get('http://localhost:3000/api/dashboard/bank', {
    const response = await axios.get('/api/dashboard/bank', {
      withCredentials: true
    })
    if (response.data.success) {
      customers.value = response.data.customers
    }
  } catch (err) {
    alert('Access denied. Only bank staff can view this page.')
    router.push('/')
  }
})

const openModal = (customer, index) => {
  selectedCustomer.value = customer
  selectedIndex.value = index
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const updateStatus = async (status) => {
  try {
    //const response = await axios.post('http://localhost:3000/api/dashboard/bank/update-kyc', {
    const response = await axios.post('/api/dashboard/bank/update-kyc', {
      email: selectedCustomer.value.email,
      status
    }, { withCredentials: true })

    if (response.data.success) {
      customers.value[selectedIndex.value].kycStatus = status
      selectedCustomer.value.kycStatus = status
      alert(`KYC ${status}`)
      closeModal()
    }
  } catch (err) {
    alert('Failed to update status')
  }
}

const logout = () => {
  localStorage.removeItem('loggedInUser')
  const users = JSON.parse(localStorage.getItem('users')) || []
  localStorage.setItem('users', JSON.stringify(users.map(u => ({ ...u, isLoggedIn: false }))))
  router.push('/')
}
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.customer-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  width: 220px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
}
.customer-card:hover {
  transform: scale(1.03);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close-btn {
  margin-top: 20px;
  background: #35495e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}
.documents a {
  display: inline-block;
  margin: 4px 0;
}
.actions button {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  background-color: #2ecc71;
  color: white;
  transition: background-color 0.3s ease;
}
.actions button:last-child {
  background-color: #e74c3c;
}
.actions button:hover {
  opacity: 0.9;
}
</style>
