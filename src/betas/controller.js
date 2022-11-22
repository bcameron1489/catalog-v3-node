const { json, application } = require('express');
const pool = require('../../db')
// const queries = require('./queries')
const fetch = require('node-fetch')
const env = require('../env')

// Beta Endpoint for get tags


const getTags = (req,res) => {
    const url = 'https://a.klaviyo.com/api/tags/?fields[tag]=name&sort=name';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        revision: '2022-11-14.pre',
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

module.exports = {
    getTags,
}