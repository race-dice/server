const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register (req,res, next) {
        const {username} = req.body
        User.create({username})
            .then(user => {
                let payload = {username:user.username, _id:user._id}
                let token = generateToken(payload)
                res.status(201).json({token,username})
            })
            .catch(next)
    }
    static showall (req, res, next){
        const { roomid } = req.params
        User.find({room: roomid})
            .then(result => {
                io.on('connection', function (socket) {
                    socket.on('datauser', function() {
                        io.emit('datauser', result);
                    })
                });
                res.status(200).json(result)
                req.io.emit('datauser', result)
            })
            .catch(next)
    }
    static update (req, res, next){
        let {id} = req.params
        let {posisi} = req.body
        User.updateOne({_id: id}, {posisi})
            .then(result => {
                return User.find({})
            })
            .then(result => {
                console.log(result);
                req.io.emit('datauser', result)
            })
            .catch(next)
    }
}

module.exports = UserController