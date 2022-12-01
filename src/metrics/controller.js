const { json, application } = require('express');
const pool = require('../../db')
// const queries = require('./queries')
const fetch = require('node-fetch')
const env = require('../env')



// Get metrics

const getMetrics = (req, res) => {
    const url = 'https://a.klaviyo.com/api/metrics/?fields[metric]=name,created,updated,integration';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            revision: '2022-10-17',
            Authorization: env.auth
        }
    };

    fetch(url, options)
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS')
            return res.json()
        } else {
            console.log('REQUEST FAILURE')
        }
    })
    .then(json => {
        console.log(json)
        res.status(200).send(json)
    })
    .catch(err => console.error('error:' + err));
}

// Get Metric By Id

const getMetricById = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/metrics/'+ `${id}` +'/?fields[metric]=name,created,updated,integration';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            revision: '2022-10-17',
            Authorization: env.auth
        }
    };

    fetch(url, options)
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS')
            return res.json()
        } else {
            console.log('REQUEST FAILURE')
        }
    })
    .then(json => {
        console.log(json)
        res.status(200).send(json)
    })
    .catch(err => console.error('error:' + err));
}

// Query Metric Aggregates   **  Eventually format to take json body for all fields.  For now just using the metric ID to process the request until UI is built

const aggregates = (req, res) => {
    const id = req.body.id
    const url = 'https://a.klaviyo.com/api/metric-aggregates/';
    const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        revision: '2022-10-17',
        'content-type': 'application/json',
        Authorization: env.auth
    },
    body: JSON.stringify({
        data: {
        type: 'metric-aggregate',
        attributes: {
            measurements: ['unique'],
            filter: [
            'greater-or-equal(datetime,2022-06-01T00:00:00),less-than(datetime,2022-12-01T00:00:00)'
            ],
            metric_id: `${id}`,
            interval: 'day',
            page_size: 500,
            timezone: 'UTC'
        }
        }
    })
    };

    fetch(url, options)
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS')
            return res.json()
        } else {
            console.log('REQUEST FAILURE')
        }
    })
    .then(json => {
        console.log(json)
        res.status(200).send(json)
    })
    .catch(err => console.error('error:' + err));

}



module.exports = {
    getMetrics,
    getMetricById,
    aggregates
}