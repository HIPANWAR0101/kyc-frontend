const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/authController')

router.post('/register', registerUser)
router.post('/login', loginUser)


router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.json({ success: true })
  })
})



module.exports = router
