const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name must be filled']
  },
  score: {
    type: Number,
    default: 0
  }
})

const User = model('User', userSchema)

module.exports = User;