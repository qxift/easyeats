const {Schema, model} = require('mongoose')

const userItemSchema = new Schema({
  userID: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  itemID: [{
    type: Schema.Types.ObjectId,
    ref: "Item"
  }],
  amount: String,

  area: Number
})

const userItem = model('UserItem', userItemSchema);

module.exports = userItem;
