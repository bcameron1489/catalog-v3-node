const { json, application } = require('express');
const pool = require('../../db')
// const queries = require('./queries')
const fetch = require('node-fetch')
const env = require('../env')

// Get Segments

const getSegments = (req, res) => {
    const url = 'https://a.klaviyo.com/api/lists/?fields[list]=name,created,updated';
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

// Get Segment by id

const getSegmentById = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/segments/'+ `${id}` +'/?fields[segment]=name,created,updated';
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

//  Get segment profiles

const getSegmentProfiles = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/segments/'+ `${id}` +'/profiles/?fields[profile]=email,external_id,anonymous_id';
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

// Get Segment Relationships

const getSegmentRelationships = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/segments/'+ `${id}` +'/relationships/profiles/';
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

// Update Segment

const updateSegment = (req, res) => {
    const id = req.body.id
    const name = req.body.name

    const url = 'https://a.klaviyo.com/api/segments/' + `${id}`;
    const options = {
        method: 'PATCH',
        headers: {
            accept: 'application/json',
            revision: '2022-10-17',
            'content-type': 'application/json',
            Authorization: env.auth
        },
        body: JSON.stringify({
            data: {type: 'segment', attributes: {name: `${name}`}, id: `${id}`}
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
    getSegments,
    getSegmentById,
    getSegmentProfiles,
    getSegmentRelationships,
    updateSegment
}