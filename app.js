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
  .catch(console.log)

app.use(function(req, res, next) {
  req.io = io
  next()
})

// io.on('connection', function (socket) {
//     socket.on('change-slide-index', function(newIndex) {
//         console.log(newIndex);
//         currentSlideIndex = newIndex;
//         io.emit('update-slide-index', currentSlideIndex);
//     })
// });

app.use(errorHandler)
server.listen(PORT, () => console.log('server is running on port', PORT));