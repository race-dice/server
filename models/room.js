const { Schema, model } = require('mongoose')

const roomSchema = new Schema({
  name: {
    type: String
  }
})

const Room = model('Room', roomSchema)

module.exports = Room;