import { Container, Row, Col, Form, FormGroup, Label, Input, Card, CardTitle, CardImg, Button } from 'reactstrap';
import Recipe from './Recipe';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';//importing react-native might introduce errors, because of dependency conflict
import { useHistory } from 'react-router-dom'

function Fridge({cookies}) {

  const [clickedRecipes, setClickedRecipes] = useState(false)
  const [clickedAddFood, setClickedAddFood] = useState(false)
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [foodItems, setFoodItems] = useState([])
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState("")

  const history = useHistory();   

  // useEffect(() => {
  //   // console.log(cookies.name)
  //   // fetch('http://localhost:3000/getInfo')
  //   // .then(response => response.json())
   
  // }, [])

  useEffect(() => {
    if (cookies.name) {
      fetch('http://localhost:3000/getFridge', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: cookies.name})
      })
      .then(res => res.json())
      .then(res => setFoodItems(res.items))
      // .then(response => response.json())
    } else {
      history.push('/signIn')
    }
  }, [])

function clickRecipesHandler(e) {
  setClickedRecipes(prev => true)
}

function clickAddFoodHandler(e) {
  setClickedAddFood(prev => true)
}

function changeFoodRecipesHandler(e) {
  //setName(e.target.value)
}

function changeAddFoodHandler(e) {
  setName(e.target.value)
}

function changeAmountHandler(e) {
  setAmount(e.target.value)
}

function submitRecipesHandler(e) {
  setError("")
  e.preventDefault()
  const recipes = fetch('http://localhost:3000/getRecipes', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name})
  })
  .then(res => res.json())
  .then(res => {
    if(res.recipes.length == 0) {
      setError("No recipes found for this ingredient")
    } else {
      setRecipes(res.recipes)
      //setFoodItems(foodItems.concat({name: name, key: foodItems.length}))
        }
    }) 
  setClickedRecipes(false)
}

function submitAddFoodHandler(e) {
  setFoodItems(foodItems.concat({name: name, key: foodItems.length}))
  setError("")
  e.preventDefault()
  const recipes = fetch('http://localhost:3000/getFoodMatches', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name})
  })
  .then(res => res.json())
  .then(res => {
    if(res.recipes.length == 0) {
      setError("No recipes found for this ingredient")
    } else {
      console.log(res.recipes.results)
      setRecipes(res.recipes.results)
      //setRecipes(res.recipes)
      //setFoodItems(foodItems.concat({name: name, key: foodItems.length}))
        }
    }) 
  setClickedAddFood(false)
}

  return (
    <>
      
        <Col>
        <div>
        <CardImg src={`fridge.jpg`} alt="fridge" style={{height:500, width:800, top: 300, left: -50, position: "relative"}}/>
        <View style={{flexGrow: 0, backgroundImage:"fridge.jpg", height:500, width:200, overflow:"scroll", top: -200, left: 330}}>
          <FlatList 
            
            numColumns={3}
            data={foodItems}
            renderItem={(item) => (
            <Card>
            <CardTitle>{item.item.name}</CardTitle>
            <img height="50p" src={`https://spoonacular.com/cdn/ingredients_100x100/${item.item.name}.jpg`} alt="FoodIcon" />
            </Card>
            )}
            extraData={foodItems}
          />
        </View>
          </div>
        </Col>
        <Col>
        <div style={{flexGrow: 0, height:500, width:400, overflow:"scroll"}}>
          {error? 
          <label style={{color:"red"}}>
          {error}
        </label>
          : <Recipe recipes={recipes}/>
          }
          </div>
        </Col>
        <Col>
          <Row>
          {clickedRecipes? 
            <Form onSubmit={submitRecipesHandler}>
              <FormGroup>
                <Label>food name</Label>
                <Input onChange={changeFoodRecipesHandler} className={"Name"} type="text" required/>
              </FormGroup>
              <FormGroup>
                  <Label>Other Preferences</Label>
                  <Input type="select">
                    <option>Maximize used ingredients </option>
                    <option>Minimize missing ingredients</option>
                  </Input>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />{' '}
                    Ignore typical pantry items, such as water, salt, flour, etc.
                  </Label>
                </FormGroup>
              <Button>Add</Button>
            </Form> :
            <Button onClick={clickRecipesHandler}>Get Recipes</Button>}
          </Row>
          <Row>
          {clickedAddFood? 
            <Form onSubmit={submitAddFoodHandler}>
              <FormGroup>
                <Label>Food name</Label>
                <Input onChange={changeAddFoodHandler} className={"Name"} type="text" required/>
              </FormGroup>
              <Button>Add</Button>
            </Form> :
            <Button onClick={clickAddFoodHandler}>Add food</Button>}
          </Row>
        </Col>
      
      
    </> 
  );
}

export default Fridge
