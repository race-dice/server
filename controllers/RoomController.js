const Room = require('../models/room')
const express = require('express')
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)
class RoomController {
    static create(req, res, next){
        let { name } = req.body
        Room.create({ name })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static read(req, res, next){
        Room.find()
            .then(data => {
                res.status(200).json(data)
                io.emit("dataroom", data)
            })
            .catch(next)
    }
}

module.exports = RoomController