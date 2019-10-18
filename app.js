if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes')
const app = express();
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')
const User = require('./models/user')
const { VerifyToken } = require("./helpers/jwt")

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',routes)

// require('./config/mongoose')

const PORT = process.env.PORT || 3000;



const server = require('http').Server(app);
const io = require('socket.io')(server);


mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(_ => console.log('connected to mongoose'))
  .catch(err => {console.log("erorrrrrrrrrrrrrrr")})

app.use(function(req, res, next) {
  req.io = io
  next()
})

io.on('connection', function(socket) {
  socket.on('sendData', function(data) {
      // console.log(data)
      User.updateOne({_id: "5da889c91c9d440000e384fb"}, {posisi:data})
      .then(result => {
          return User.find({})
      })
      .then(result => {
          // console.log(result);
          io.emit('datauser', result)
      })
      // save di datasbe, kirim ke yang lain
  })
  socket.on("fetchUser", roomid => {
    User.find({room: roomid})
      .then(result => {
          io.emit("returnedFetch", result)
      })
  })
  socket.on("updatePosition", payload => {
    const { token, posisi, roomid } = payload
    let user = VerifyToken(token)
    User.findOne({ _id: user._id }).exec()
    .then(user => {
      return User.updateOne({ _id: user._id }, { posisi: user.posisi + posisi })
    })
    .then(() => {
      return User.find({room: roomid})
    })
    .then(result => {
      io.emit("returnedFetch", result)
    })
  })
})

app.use('/',routes)

app.use(errorHandler)
server.listen(PORT, () => console.log('server is running on port', PORT));