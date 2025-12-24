// const express = require('express')
// const session = require('express-session')
// const cors = require('cors')
// const authRoutes = require('./routes/auth')
// const dashboardRoutes = require('./routes/dashboard')


// const app = express()

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }))
// app.use(express.json())

// app.use(session({
//   secret: 'mock-secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false }
// }))

// app.use('/api', authRoutes)
// app.use('/api/dashboard', dashboardRoutes)


// app.listen(3000, () => {
//   console.log('Mock backend running on http://localhost:3000')
// })






// onMounted(() => {
//   setTimeout(async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/dashboard/customer', {
//         withCredentials: true
//       })

//       if (response.data.success) {
//         user.value = response.data.user
//       } else {
//         throw new Error('Unauthorized')
//       }
//     } catch (err) {
//       console.error('Session check failed:', err)
//       router.push('/')
//     }
//   }, 300) // ⏳ small delay to allow session cookie to be set
// })




const express = require('express')
const session = require('express-session')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const dashboardRoutes = require('./routes/dashboard')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// ✅ Increase payload size limit to 20MB
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true, limit: '20mb' }))

app.use(session({
  secret: 'mock-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use('/api', authRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.listen(3000, () => {
  console.log('Mock backend running on http://localhost:3000')
})
