const { json, application } = require('express');
const pool = require('../../db')
// const queries = require('./queries')
const fetch = require('node-fetch')
const env = require('../env');
const { create } = require('domain');
const bodyParser = require('body-parser');

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
    const property = req.body.property

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
            properties: property,
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

//  Update Profile

const updateProfile = (req, res) => {
    const id = req.body.id
    const property = req.body.property
    const userEmail = req.body.userEmail
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    const url = 'https://a.klaviyo.com/api/profiles/' + `${id}`;
    const options = {
    method: 'PATCH',
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
            properties: property,
            email: `${userEmail}`,
            first_name: `${firstName}`,
            last_name: `${lastName}`
        },
        id: `${id}`
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

//  Supress Profiles

const suppressProfiles = (req, res) => {
    const emails = req.body.emails
    console.log(emails)

    const url = 'https://a.klaviyo.com/api/profile-suppression-bulk-create-jobs/';
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
        type: 'profile-suppression-bulk-create-job',
        attributes: {suppressions: emails}
        }
    })
    };


    fetch(url, options)
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS')
        } else {
            console.log('REQUEST FAILURE')
            res.end()
        }
    })
    .catch(err => console.error('error:' + err));
    res.send('Successfully suppressed emails')
}

const unsuppressProfiles = (req, res) => {
    const emails = req.body.emails
    console.log(emails)

    const url = 'https://a.klaviyo.com/api/profile-unsuppression-bulk-create-jobs/';
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
        type: 'profile-unsuppression-bulk-create-job',
        attributes: {suppressions: emails}
        }
    })
    };

    fetch(url, options)
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS')
        } else {
            console.log('REQUEST FAILURE')
            res.end()
        }
    })
    .catch(err => console.error('error:' + err));
    res.send('Successfully unsuppressed emails')
}

// Subscribe Profiles

const subscribeProfiles = (req, res) => {
    const id = req.body.id
    const emails = req.body.emails

    const url = 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/';
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
        type: 'profile-subscription-bulk-create-job',
        attributes: {subscriptions: emails, list_id: `${id}`}
        }
    })
    };

    fetch(url, options)
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS')
        } else {
            console.log('REQUEST FAILURE')
            res.end()
        }
    })
    .catch(err => console.error('error:' + err));
    res.send('Successfully subscribed emails')
}

//  Unsubscribe Profiles

const unsubscribeProfiles = (req, res) => {
    const id = req.body.id
    const profiles = req.body.profiles

    const url = 'https://a.klaviyo.com/api/profile-unsubscription-bulk-create-jobs/';
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
        type: 'profile-unsubscription-bulk-create-job',
        attributes: {emails: profiles, list_id: `${id}`}
        }
    })
    };

    fetch(url, options)
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS')
        } else {
            console.log('REQUEST FAILURE')
            res.end()
        }
    })
    .catch(err => console.error('error:' + err));
    res.send('Successfully unsubscribed emails')
}


module.exports = {
    getProfiles,
    getProfileById,
    getProfileLists,
    getProfileSegments,
    getProfileRelationships,
    createProfile,
    updateProfile,
    suppressProfiles,
    unsuppressProfiles,
    subscribeProfiles,
    unsubscribeProfiles
}