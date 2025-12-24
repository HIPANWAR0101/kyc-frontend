const { getUsers, saveUsers } = require('../utils/storage')

// Customer dashboard: fetch logged-in customer's data
const getCustomerDashboard = (req, res) => {
  if (!req.session.user || req.session.user.type !== 'customer') {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  const users = getUsers()
  const user = users.find(u => u.email === req.session.user.email)
  res.json({ success: true, user })
}

// Bank dashboard: fetch all customer KYC data
const getBankDashboard = (req, res) => {
  if (!req.session.user || req.session.user.type !== 'bank') {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  const users = getUsers()
  const customers = users.filter(u => u.type === 'customer')
  res.json({ success: true, customers })
}

// Bank: update KYC status (Approve/Reject)
const updateKYCStatus = (req, res) => {
  const { email, status } = req.body

  if (!req.session.user || req.session.user.type !== 'bank') {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  const users = getUsers()
  const index = users.findIndex(u => u.email === email && u.type === 'customer')

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Customer not found' })
  }

  users[index].kycStatus = status
  saveUsers(users)

  res.json({ success: true, message: `KYC ${status}` })
}

// Customer: update their own KYC details
const updateCustomerKYC = (req, res) => {
  if (!req.session.user || req.session.user.type !== 'customer') {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  const users = getUsers()
  const index = users.findIndex(u => u.email === req.session.user.email)

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found' })
  }

  users[index] = { ...users[index], ...req.body }
  saveUsers(users)

  res.json({ success: true, message: 'KYC updated successfully' })
}

module.exports = {
  getCustomerDashboard,
  getBankDashboard,
  updateKYCStatus,
  updateCustomerKYC
}
