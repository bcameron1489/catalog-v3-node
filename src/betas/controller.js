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

// Get Tag By ID

const getTagById = (req, res) => {
    const id  = req.params.id
    console.log(`${id}`)
    const url = 'https://a.klaviyo.com/api/tags/' + `${id}` + '/?fields[tag]=name';
    console.log(url)
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

// Beta Endpoint for get list tags

const getListTags = (req,res) => {
    const id  = req.params.id
    console.log(`${id}`)
    const url = 'https://a.klaviyo.com/api/lists/' + `${id}` + '/tags/?fields[tag]=name';
    console.log(url)
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

// Beta Endpoint for get flow tags

const getFlowTags = (req,res) => {
    const id  = req.params.id
    console.log(`${id}`)
    const url = 'https://a.klaviyo.com/api/flows/' + `${id}` + '/tags/?fields[tag]=name';
    console.log(url)
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

// Beta Endpoint for get segment tags

const getSegmentTags = (req,res) => {
    const id  = req.params.id
    console.log(`${id}`)
    const url = 'https://a.klaviyo.com/api/segments/' + `${id}` + '/tags/?fields[tag]=name';
    console.log(url)
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

// Post Request for creating tags

const createTag = (req,res) => {
    const name = req.params.name
    const url = 'https://a.klaviyo.com/api/tags/';
    const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        revision: '2022-11-14.pre',
        'content-type': 'application/json',
        Authorization: env.auth
    },
    body: JSON.stringify({data: {type: 'tag', attributes: {name: `${name}`}}})
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

// Update Tag

const updateTag = (req,res) => {
    const id = req.params.id
    const name = req.body.name
    const url = 'https://a.klaviyo.com/api/tags/' + `${id}`;
    const options = {
    method: 'PATCH',
    headers: {
        accept: 'application/json',
        revision: '2022-11-14.pre',
        'content-type': 'application/json',
        Authorization: env.auth
    },
    body: JSON.stringify({data: {type: 'tag', attributes: {name: `${name}`}, id: `${id}`}})
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
    res.status(200).send("Tag Updated successfully to " + `${name}`)
}

// Delete Tag

const deleteTag = (req, res) => {
    const id = req.params.id
    const url = 'https://a.klaviyo.com/api/tags/' + `${id}`;
    const options = {
    method: 'DELETE',
    headers: {
        accept: 'application/json',
        revision: '2022-11-14.pre',
        Authorization: env.auth
    }
    };

    fetch(url, options)
            .then(r => {
                if (r.ok) {
                    console.log('Deleted Tag')
                } else  {
                    console.log('Failed to remove tag')
                    return ;
                }
            })
            .catch(err => console.error('error:' + err));

    res.status(200).send('Your Tag was deleted with the ID ' + `${id}`)

}





module.exports = {
    getTags,
    getTagById,
    getListTags,
    getFlowTags,
    getSegmentTags,
    createTag,
    updateTag,
    deleteTag,
}