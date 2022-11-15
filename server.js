const express = require('express')

const catalogRoutes = require('./src/catalogs/routes')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/v1/catalogs', catalogRoutes)

app.listen(port, () => console.log(`app listening on port ${port}`))