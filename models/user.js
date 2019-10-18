const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'name must be filled']
  },
  score: {
    type: Number,
    default: 0
  },
  posisi: {
    type: Number,
    default: 0
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'rooms',
    default: null
  }
})

const User = model('User', userSchema)

module.exports = User;