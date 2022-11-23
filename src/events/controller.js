const { json, application } = require('express');
const pool = require('../../db')
// const queries = require('./queries')
const fetch = require('node-fetch')
const env = require('../env')

// Get Events

const getEvents = (req,res) => {
    const url = 'https://a.klaviyo.com/api/events/?fields[event]=metric_id,profile_id,timestamp,event_properties,datetime,uuid&fields[metric]=name&include=metrics&sort=datetime';
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

// Get event by id

const getEventById = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/events/' + `${id}` + '/?fields[event]=metric_id,profile_id,timestamp,event_properties&fields[metric]=name,created,integration&fields[profile]=email&include=metrics,profiles';
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

// Create Event

const createEvent = (req, res) => {
    const {email, name} = req.body
    console.log(`${email}`, `${name}`)
    const url = 'https://a.klaviyo.com/api/events/';
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
        type: 'event',
        attributes: {
            profile: {email: `${email}`},
            metric: {name: `${name}`},
            properties: {'Test Property': 'Test Value'}
        }
        }
    })
    };

    fetch(url, options)
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS: 202 ACCEPTED')
        } else {
            console.log('REQUEST FAILURE')
            res.end()
        }
    })
    .catch(err => console.error('error:' + err));

    res.status(202).send({msg: '202 Accepted, ' + `${name}` + ' sent with profile ' + `${email}`})
}


module.exports = {
    getEvents,
    getEventById,
    createEvent,
}