
<template>
  <div class="customer-card" @click="openModal">
    <h3>{{ customer.name }}</h3>
    <p>Status: {{ customer.kycStatus || 'Pending' }}</p>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ customer.name }}</h2>
        <p><strong>Email:</strong> {{ customer.email }}</p>
        <p><strong>Mobile:</strong> {{ customer.mobile }}</p>
        <p><strong>Aadhaar:</strong> {{ customer.aadhaar }}</p>
        <p><strong>PAN:</strong> {{ customer.pan }}</p>

        <div class="documents">
          <p><strong>Documents:</strong></p>
          <a v-if="customer.aadhaarFile" :href="customer.aadhaarFile" download="aadhaar.jpg">Aadhaar</a><br />
          <a v-if="customer.panFile" :href="customer.panFile" download="pan.jpg">PAN</a><br />
          <a v-if="customer.addressProof" :href="customer.addressProof" download="address-proof.jpg">Address</a><br />
          <a v-if="customer.photo" :href="customer.photo" download="photo.jpg">Photo</a>
        </div>

        <div class="actions">
          <button v-if="!customer.kycStatus" @click.stop="updateStatus('Approved')">Approve</button>
          <button v-if="!customer.kycStatus" @click.stop="updateStatus('Rejected')">Reject</button>
          <span v-else>{{ customer.kycStatus }}</span>
        </div>

        <button class="close-btn" @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

defineProps({
  customer: Object,
  index: Number
})

const emit = defineEmits(['status-updated'])

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const updateStatus = async (status) => {
  try {
    const response = await axios.post('http://localhost:3000/api/dashboard/bank/update-kyc', {
      email: customer.email,
      status
    }, { withCredentials: true })

    if (response.data.success) {
      emit('status-updated', { index, status })
      closeModal()
      alert(`KYC ${status}`)
    }
  } catch (err) {
    alert('Failed to update status')
  }
}
</script>

<style scoped>
.customer-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
}
.customer-card:hover {
  transform: scale(1.02);
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
}
</style>
