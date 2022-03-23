const PORT = 3223
const express = require('express')
const app = express()
const routes = require('./route')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
})