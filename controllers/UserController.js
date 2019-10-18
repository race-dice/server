const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

class UserController {
    static register (req,res, next) {
        const {username} = req.body
        User.create({username})
            .then(result => {
                let payload = {username:result.username, _id:result._id}
                let token = generateToken(payload)
                res.status(201).json({token,username})
            })
            .catch(next)
    }
<<<<<<< HEAD
    static showall (req, res, next) {
        User.find().exec()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(next)
=======
    static showall (req, res, next){
        // const {roomid} = req.params
        User.find({}) //{room: roomid}
            .then(result => {
                // console.log("berhasilll");
                // console.log(result);
                io.on('connection', function (socket) {
                    // console.log("testttttttttttttttttttttttttttttt");
                    socket.on('datauser', function() {
                        io.emit('datauser', result);
                    })
                });
                
                res.status(200).json({result})
            })
            .catch(next)            
>>>>>>> 381d04641a65696429c7f8af27be529a416f5080
    }
}

module.exports = UserController