const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register (req,res,next) {
        const {username} = req.body
        User.create({username})
            .then(result => {
                let payload = {username:result.username, _id:result._id}
                let token = generateToken(payload)
                res.status(201).json({token,username})
            })
            .catch(next)
    }
    static showall (req, res, next) {
        User.find().exec()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(next)
    }
}

module.exports = UserController