const mongoose = require('mongoose')

const url = process.env.MONGOOSE_URL || 'mongodb://localhost:27017/balap-dadu'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(_ => console.log('connected to mongoose'))
  .catch(console.log)