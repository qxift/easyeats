const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  username: String,
  password: String,
  items: [String],
})

const user = model('User', userSchema);

module.exports = user;
