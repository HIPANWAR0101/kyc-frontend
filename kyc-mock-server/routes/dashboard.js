const express = require('express')
const router = express.Router()
const {
  getCustomerDashboard,
  getBankDashboard,
  updateKYCStatus,
  updateCustomerKYC
} = require('../controllers/dashboardController')

router.get('/customer', getCustomerDashboard)
router.get('/bank', getBankDashboard)
router.post('/bank/update-kyc', updateKYCStatus)
router.post('/customer/update-kyc', updateCustomerKYC)


module.exports = router
