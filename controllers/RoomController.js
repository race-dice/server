const Room = require('../models/room')

class RoomController {
    static create(req, res, next){
        let {nama} = req.body
        Room.create({
            nama
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static read(req, res, next){
        Room.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = RoomController