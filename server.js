const express = require('express')

const catalogRoutes = require('./src/catalogs/routes')
const betaRoutes = require('./src/betas/routes')
const eventRoutes = require('./src/events/routes')
const listRoutes = require('./src/lists/routes')
const segmentRoutes = require('./src/segments/routes')
const metricRoutes = require('./src/metrics/routes')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/v1/catalogs', catalogRoutes)
app.use('/beta/v1/tags', betaRoutes)
app.use('/api/v1/events', eventRoutes)
app.use('/api/v1/lists', listRoutes)
app.use('/api/v1/segments', segmentRoutes)
app.use('/api/v1/metrics', metricRoutes)

app.listen(port, () => console.log(`app listening on port ${port}`))