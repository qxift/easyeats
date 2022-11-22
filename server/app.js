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
const Fridge = require('../server/model/fridge');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
// const fs = require('fs');

app.use(cors())
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(fileUpload());

const key = '623660a9d9954946acef1135e9683449';

async function getDesc(recipes) {
  const descArr = []

  for (i = 0; i < recipes.length; i++) {
    await fetch(`https://api.spoonacular.com/recipes/${recipes[i].id}/information?includeNutrition=false&apiKey=${key}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(res => {
      const {title, image, spoonacularSourceUrl, summary} = res;
      descArr.push({title, image, spoonacularSourceUrl, summary})
    })
  }

  return descArr
}

app.post('/getRecipes', async (req, res) => {
  const {name} = req.body

  const recipes = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${name}&apiKey=${key}`, {
    method: "GET"
  })
  .then(res => res.json())

  if (recipes) {
    const descArr = await getDesc(recipes)
    res.json({recipes: descArr})
  } else {
    res.sendStatus(400)
  }
})

app.post('/getFoodMatches', async (req, res) => {
  const {name} = req.body

  const matches = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${name}&apiKey=623660a9d9954946acef1135e9683449`, {
    method: "GET"
  })
  .then(res => res.json())

  if (1 == 1) {
    res.json({recipes: matches})
  } else {
    res.sendStatus(400)
  }
})

app.post('/signIn', async (req, res) => {
  const {username, password} = req.body
  const user = await User.findOne({username});
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if(match) {
      res.json({user});
    } else {
      res.sendStatus(401);
    }
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
    const hashPass = await bcrypt.hash(password, 10)
    const user = await User.create({ username, password: hashPass});
    res.json({user});
  }
})

app.listen(3000, () => {
  console.log(`Server port 3000 is ready`);
  mongoose.connect(
    "mongodb+srv://qxift:7vCcstNUuOZVMqCv@cluster0.3aaz9gl.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
    () => {
      console.log('mongoose connected');
    }
  );
});
