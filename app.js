const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('./config/mongoose')

const PORT = process.env.PORT || 3000;

app.use(cosr())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

server.listen(PORT, () => console.log('server is running on port', PORT));

let currentSlideIndex = 0;

io.on('connection', function (socket) {
    socket.on('change-slide-index', function(newIndex) {
        console.log(newIndex);
        currentSlideIndex = newIndex;

        io.emit('update-slide-index', currentSlideIndex);
    })
});
