const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();
const path = require('path');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
const Item = require('../server/model/item');
const User = require('../server/model/user');
const UserItem = require('../server/model/userItem');
// const fs = require('fs');

app.use(cors())
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(fileUpload());


// app.get('/getInfo', async (req, res) => {
//   const models = await BagModel.find()
//   const sizes = await BagSize.find({bagModel: models[0].name})
//   const colors = await BagColor.find()
//   const materials = await Material.find()
//   res.json({models, sizes, colors, materials})
// })

// app.post('/getSizesModelInfo', async (req, res) => {
//   const model = await BagModel.findOne({name: req.body.model}, {_id: 0, __v: 0})
//   const sizes = await BagSize.find({bagModel: model.name})
//   res.json({model, sizes})
// })

// app.post('/getProportions', async (req, res) => {
//   const {model, sizeName} = req.body
//   const size = await BagSize.findOne({bagModel: model, sizeName})
//   res.json({proportions: {
//     price: size.price,
//     height: size.height,
//     width: size.width,
//     depth: size.depth,
//     handleSize: size.handleSize
//   }})
// })

// app.post('/getColor', async (req, res) => {
//   const color = await BagColor.findOne({name: req.body.color}, {_id: 0, __v: 0})
//   res.json(color)
// })

// app.post('/getMaterial', async (req, res) => {
//   const material = await Material.findOne({name: req.body.material}, {_id: 0, __v: 0})
//   res.json(material)
// })

// app.post('/check', async (req, res) => {
//   const { model, color, material, size, limit, handlesColor, bottomColor} = req.body;
//   const finalBag = await BagModel.findOne({ name: model });
//   const finalBagColor = await BagColor.findOne({ name: color });
//   const finalMaterial = await Material.findOne({ name: material });
//   const finalSize = await BagSize.findOne({ bagModel: model, sizeName: size });
//   let finalHandlesColor = null;
//   let finalBottomColor = null;
//   let colorPrice = finalBagColor.price;
//   if (model.changeableHandles) {
//     finalHandlesColor = await BagColor.findOne({ name: handlesColor });
//     colorPrice += finalHandlesColor.price
//   } 
//   if (model.changeableBottom) {
//     finalBottomColor = await BagColor.findOne({ name: bottomColor });
//     colorPrice += finalBottomColor.price
//   }
//   let numBags = limit
//   const check = await Check.create({
//     bagModel: finalBag,
//     bagColor: finalBagColor,
//     material: finalMaterial,
//     size: finalSize,
//     bottomColor: finalHandlesColor,
//     handlesColor: finalBottomColor,
//     numBags: numBags,
//     price:
//     (finalBagColor.price + finalMaterial.price + finalSize.price),
//     image: null,
//     text: null
//   });
//   res.sendStatus(200)
// });

// let myModel = "";
// let myColor = "";
// let myMaterial = "";

// app.get('/getBag', async (req, res) => {
//   const check = await Check.findOne({}, {}, { sort: { 'updatedAt' : -1 } }).populate('bagModel').populate('bagColor').populate('material')
//   myModel = check.bagModel.name;
//   myColor = check.bagColor.name;
//   myMaterial = check.material.name;
//   res.json({model: check.bagModel.name, color: check.bagColor.name, material: check.material.name, price: check.price})
// })

// app.post('/uploading', (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({msg: 'No file uploaded'})
//   }

//   const {image} = req.files;

//   if (!fs.existsSync(`${__dirname}/public/myImage/${image.name}`)) {
//     const location = `${__dirname}/client/public/myImage/${image.name}`.replace("/server", "")
//     image.mv(location)
//     const location2 = `${__dirname}/public/myImage/${image.name}`
//     image.mv(location2)
//   }
//   res.json({imagePath: image.name})
// })

// app.post('/check2', async (req, res) => {
//   const {imagePath, imageHeight, imageColors, text, textSize, bold, italic, font, textColor, price} = req.body
//   const check = await Check.findOneAndUpdate({}, {}, { sort: { 'updatedAt' : -1 } }, {price: price})
//   if (imagePath) {
//     const myImgColors = [];
//     for (let i = 0; i < imageColors.length; i++) {
//       const color = await BagColor.findOne({name: imageColors[i]})      
//       myImgColors.push(color)
//     }
//     const image = await Image.create({name: imagePath, area: imageHeight, colors: myImgColors})
//     const check2 = await Check.findByIdAndUpdate(check._id, {image: image});
//     check2.save()
//   }
//   if (text) {
//       const color = await BagColor.findOne({name: textColor})
//       const myText = await Text.create({name: text, color, area: textSize, bold, italic, font})
//       const check2 = await Check.findByIdAndUpdate(check._id, {text: myText});
//       check2.save()
//     }
// })

app.post('/getRecipes', async (req, res) => {
  const {name, amount} = req.body
  //TODO
  res.json({recipes: ["recipes"]})
})

app.post('/signIn', async (req, res) => {
  const {username, password} = req.body
  const user = await User.findOne({ username });
  if (user) {
    res.json({user});
  } else {
    res.sendStatus(400);
  }
})

app.post('/signUp', async (req, res) => {
  const {username, password} = req.body
  const user = await User.findOne({ username });
  if (user) {
    res.sendStatus(400);
  } else {
    const user = await User.create({ username, password});
    res.json({user});
  }
})

app.listen(3000, () => {
  console.log(`Server port 3000 is ready`);
  mongoose.connect(
    "mongodb://localhost:27017/easyeats",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
    () => {
      console.log('mongoose connected');
    }
  );
});
