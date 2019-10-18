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

// require('./config/mongoose')

const PORT = process.env.PORT || 3000;

app.use(cors())


const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(_ => console.log('connected to mongoose'))
  .catch(console.log)

app.use(function(req, res, next) {
  req.io = io
  next()
})

app.use('/',routes)

app.use(errorHandler)
server.listen(PORT, () => console.log('server is running on port', PORT));