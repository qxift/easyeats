import { Container, Row, Col, Form, FormGroup, Label, Input, Card, CardTitle, CardImg, Button } from 'reactstrap';
import Recipe from './Recipe';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';//importing react-native might introduce errors, because of dependency conflict

function Fridge() {

  const [clicked, setClicked] = useState(false)
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [foodItems, setFoodItems] = useState([])
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    
    // fetch('http://localhost:3000/getInfo')
    // .then(response => response.json())
   
  }, [recipes])

function clickHandler(e) {
  setClicked(prev => true)
}

function changeFoodHandler(e) {
  setName(e.target.value)
}

function changeAmountHandler(e) {
  setAmount(e.target.value)
}

function submitHandler(e) {
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
      setFoodItems(foodItems.concat({name: name, key: foodItems.length}))
        }
    })
    
  setClicked(false)
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
          <Row>
          {clicked? 
            <Form onSubmit={submitHandler}>
              <FormGroup>
                <Label>food name</Label>
                <Input onChange={changeFoodHandler} className={"Name"} type="text" required/>
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
            <Button onClick={clickHandler}>Add food</Button>}
          </Row>
          <Row>
          <div style={{flexGrow: 0, height:500, width:400, overflow:"scroll"}}>
          {error? 
          <label style={{color:"red"}}>
          {error}
        </label>
          : <Recipe recipes={recipes}/>
          }
          </div>
          </Row>
        </Col>
      
      
    </> 
  );
}

export default Fridge
