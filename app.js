if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/',routes)

require('./config/mongoose')

const PORT = process.env.PORT || 3000;

app.use(cors())
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
