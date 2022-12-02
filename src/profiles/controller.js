const { json, application } = require('express');
const pool = require('../../db')
// const queries = require('./queries')
const fetch = require('node-fetch')
const env = require('../env');
const { create } = require('domain');

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

// Get Profile By Id

const getProfileById = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/profiles/'+ `${id}` +'/?fields[list]=name,created,updated&fields[profile]=email,external_id&include=lists';
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


// Get Profile Lists

const getProfileLists = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/profiles/'+ `${id}` +'/lists/?fields[list]=name,created,updated';
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

// Get profile Segments

const getProfileSegments = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/profiles/'+ `${id}` +'/segments/?fields[segment]=name,created,updated';
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

// Get Profile Relationships

const getProfileRelationships = (req, res) => {
    const id = req.params.id
    const type = req.params.type

    const url = 'https://a.klaviyo.com/api/profiles/'+ `${id}` +'/relationships/' + `${type}`;
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

//  Create Profile

const createProfile = (req, res) => {
    const userEmail = req.body.userEmail

    const url = 'https://a.klaviyo.com/api/profiles/';
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
          type: 'profile',
          attributes: {
            email: `${userEmail}`
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
    getProfiles,
    getProfileById,
    getProfileLists,
    getProfileSegments,
    getProfileRelationships,
    createProfile
}