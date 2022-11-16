const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  username: String,
  password: String,
  fridge: {
    type: Schema.Types.ObjectId,
    ref: "Fridge"
  },
})

const user = model('User', userSchema);

module.exports = user;
