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

const updateList = (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const url = 'https://a.klaviyo.com/api/lists/' + `${id}`;
    const options = {
        method: 'PATCH',
        headers: {
            accept: 'application/json',
            revision: '2022-10-17',
            'content-type': 'application/json',
            Authorization: env.auth
        },
        body: JSON.stringify({data: {type: 'list', attributes: {name: `${name}`}, id: `${id}`}})
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
    res.send('Successfully Updated List Name to ' + `${name}`)
}

// Delete List

const deleteList = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/lists/' + `${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            revision: '2022-10-17',
            Authorization: env.auth
        }
    };

    fetch(url, options)
            .then(r => {
                if (r.ok) {
                    console.log('Deleted List')
                } else  {
                    console.log('Failed to remove List')
                    return ;
                }
            })
            .catch(err => console.error('error:' + err));

    res.status(200).send('Your List was deleted with the ID ' + `${id}`)
}


// Add profiles to list

const addProfileToList = (req, res) => {
    const listId = req.params.listId
    const profileId = req.body.profileId
    
    const url = 'https://a.klaviyo.com/api/lists/'+ `${listId}` +'/relationships/profiles/';
    const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        revision: '2022-10-17',
        'content-type': 'application/json',
        Authorization: env.auth
    },
    body: JSON.stringify({data: [{type: 'profile', id: `${profileId}`}]})
    };

    fetch(url, options)
            .then(r => {
                if (r.ok) {
                    console.log('Profile added to List')
                } else  {
                    console.log('Failed to add to List')
                    return ;
                }
            })
            .catch(err => console.error('error:' + err));

    res.status(200).send('Profile ' + `${profileId}` + ' was added to list')
}

// Delete profile from list

const removeFromList = (req, res) => {
    const listId =  req.params.id
    const profileId = req.body.profileId

    const url = 'https://a.klaviyo.com/api/lists/'+ `${listId}` +'/relationships/profiles/';
    const options = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            revision: '2022-10-17',
            'content-type': 'application/json',
            Authorization: env.auth
        },
        body: JSON.stringify({data: [{type: 'profile', id: `${profileId}`}]})
    };

    fetch(url, options)
            .then(r => {
                if (r.ok) {
                    console.log('Removed profile from List')
                } else  {
                    console.log('Failed to remove from List')
                    return ;
                }
            })
            .catch(err => console.error('error:' + err));

    res.status(200).send('Profile ' + `${profileId}` + ' removed from list with the id: ' + `${listId}`)
}

module.exports = {
    getLists,
    getListById,
    getListProfiles,
    getListRelationships,
    createList,
    addProfileToList,
    updateList,
    deleteList,
    removeFromList,
}