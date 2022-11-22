const express = require('express')

const catalogRoutes = require('./src/catalogs/routes')
const betaRoutes = require('./src/betas/routes')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/v1/catalogs', catalogRoutes)
app.use('/beta/v1/tags', betaRoutes)

app.listen(port, () => console.log(`app listening on port ${port}`))