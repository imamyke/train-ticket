const express = require('express')
const app = express()
const cors = require('cors')
const routers = require('./routes')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT || 6800
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routers)


app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
})