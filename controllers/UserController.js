const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')
const ObjectId = require("mongoose").Types.ObjectId

class UserController {
    static register (req,res, next) {
        const {username} = req.body
        User.create({username})
            .then(user => {
                let payload = {username:user.username, _id:user._id}
                let token = generateToken(payload)
                res.status(201).json({token,username, id: user._id})
            })
            .catch(next)
    }
    static updateRoomId(req ,res, next) {
        const { _id } = req.loggedUser
        const { roomid } = req.params
        User.updateOne({ _id }, { room: ObjectId(roomid) }).exec()
        .then(() => { res.status(200).json({ msg: "success" }) })
        .catch(console.log)
    }
    static showall (req, res, next){
        const { roomid } = req.params
        User.find({room: roomid})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = UserController