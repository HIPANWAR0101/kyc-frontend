

const bcrypt = require('bcrypt')
const { getUsers, saveUsers } = require('../utils/storage')

// Register user with hashed password
const registerUser = async (req, res) => {
  const { email, password, type } = req.body
  const users = getUsers()

  const existingUser = users.find(u => u.email === email)
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = { email, password: hashedPassword, type, kycStatus: 'Pending' }

  users.push(newUser)
  saveUsers(users)

  res.json({ success: true, message: 'User registered successfully' })
}

// Login user with password comparison
const loginUser = async (req, res) => {
  const { email, password, type } = req.body
  const users = getUsers()

  const user = users.find(u => u.email === email && u.type === type)
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' })
  }

  req.session.user = { email: user.email, type: user.type }
  res.json({ success: true, user: req.session.user })
}

module.exports = { registerUser, loginUser }
