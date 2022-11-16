const {Schema, model} = require('mongoose')

const fridgeSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  itemIDs: [{
    type: Schema.Types.ObjectId,
    ref: "Item"
  }]
})

const Fridge = model('Fridge', fridgeSchema);

module.exports = Fridge;
