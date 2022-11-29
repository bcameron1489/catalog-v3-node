const { json, application } = require('express');
const pool = require('../../db')
// const queries = require('./queries')
const fetch = require('node-fetch')
const env = require('../env')


// Get Lists

const getLists = (req, res) => {
    const url = 'https://a.klaviyo.com/api/lists/';
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

// Get List By ID

const getListById = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/lists/'+ `${id}` +'/?fields[list]=name,created,updated';
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

// Get List Profiles

const getListProfiles = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/lists/'+ `${id}` +'/profiles/?fields[profile]=email';
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

// Get List Profile Relationships

const getListRelationships = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/lists/'+ `${id}` +'/relationships/profiles/';
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

//  Create List

const createList = (req, res) => {
    const name = req.body.name
    const url = 'https://a.klaviyo.com/api/lists/';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            revision: '2022-10-17',
            'content-type': 'application/json',
            Authorization: env.auth
        },
        body: JSON.stringify({data: {type: 'list', attributes: {name: `${name}`}}})
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
    getLists,
    getListById,
    getListProfiles,
    getListRelationships,
    createList,
}