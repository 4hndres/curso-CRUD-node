const {response, request} = require('express')

const GetUsers = (req, res = response) => {
    const {q, name='Circe', apikey} = req.query
    res.json({ msg: "Get API - controller", q, name, apikey });
}

const PutUsers = (req, res = response) => {
    const id = req.params.userId
    res.status(500).json({ msg: "Put API - controller", id });
}

const PostUsers = (req, res = response) => {
    const {name, age} = req.body
    res.status(201).json({ msg: "Post API - controller", name, age });
}

const DeleteUsers = (req, res = response) => {
    res.json({ msg: "Delete API - controller" });
}

const PatchUsers = (req, res = response) => {
    res.json({ msg: "Patch API - controller" });
}


module.exports = {
    GetUsers, PutUsers, PostUsers, DeleteUsers, PatchUsers
}