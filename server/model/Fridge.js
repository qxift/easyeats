const {Schema, model} = require('mongoose')

const fridgeSchema = new Schema({
  itemIDs: [{
    type: Schema.Types.ObjectId,
    ref: "Item"
  }]
})

const Fridge = model('Fridge', fridgeSchema);

module.exports = Fridge;
