const { json, application } = require('express');
const pool = require('../../db')
// const queries = require('./queries')
const fetch = require('node-fetch')
const env = require('../env')

// Get Profiles

const getProfiles = (req, res) => {
    const url = 'https://a.klaviyo.com/api/profiles/?fields[profile]=email,external_id,anonymous_id,first_name&filter=less-than(created,2022-12-01T00:00:00)&sort=-created';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            revision: '2022-10-17',
            Authorization: env.auth
        }
    }

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
    getProfiles
}