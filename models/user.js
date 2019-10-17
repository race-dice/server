const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  name: {
    Type: String,
    required: [true, 'name must be filled']
  }
})

const User = model('User', userSchema)

module.exports = User;