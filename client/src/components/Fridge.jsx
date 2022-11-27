import { Container, Row, Col, Form, FormGroup, Label, Input, Card, CardTitle, CardImg, Button } from 'reactstrap';
import Recipe from './Recipe';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';//importing react-native might introduce errors, because of dependency conflict
import { useHistory } from 'react-router-dom'
import './Fridge.css';
import fridge_logo from './images/logo_title.png';
function Fridge({cookies}) {

  const [clickedRecipes, setClickedRecipes] = useState(false)
  const [clickedAddFood, setClickedAddFood] = useState(false)
  const [clickedDelete, setClickedDelete] = useState(false)
  const [showFoundIngretients, setShowFoundIngretients] = useState(false)
  const [showRecipes, setShowRecipes] = useState(false)
  const [name, setName] = useState("")
  const [ing, setIng] = useState("")
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

function appendFoodItems(name1, id, image) {
  let names = name1
  if(foodItems.length > 0){
    for(let i = 0; i < foodItems.length;i++){
      names += "," + foodItems[i].name
    }
  }
  setFoodItems(foodItems.concat({name: name1, key: foodItems.length, id: id, image: image}))
  console.log(names)
  setName(names)
  setIng(name1)
}

function clickFoodItem(item){
  if(clickedDelete){
    console.log(foodItems.findIndex((el) => {return item == el}))
    foodItems.splice(foodItems.findIndex((el) => {return item == el}),1)
    setFoodItems(foodItems)
  }
  let names = ""
  if(foodItems.length > 0){
    for(let i = 0; i < foodItems.length;i++){
      names += "," + foodItems[i].name
    }
  }
  setName(names)

}

function clickDeleteHandler(e) {
  setClickedDelete(prev => true)
}

function clickStopDeleteHandler(e) {
  setClickedDelete(prev => false)
}

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
  setIng(e.target.value)
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
  setShowFoundIngretients(false)
  setShowRecipes(true)
}

function submitAddFoodHandler(e) {
  setError("")
  e.preventDefault()
  const recipes = fetch('http://localhost:3000/getFoodMatches', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ing})
  })
  .then(res => res.json())
  .then(res => {
    if(res.recipes.length == 0) {
      setError("No recipes found for this ingredient")
    } else {
      setRecipes(res.recipes.results)
      //setRecipes(res.recipes)
      //setFoodItems(foodItems.concat({name: name, key: foodItems.length}))
        }
    }) 
  setClickedAddFood(false)
  setShowRecipes(false)
  setShowFoundIngretients(true)
}

  return (
    <>
    
    <img src={fridge_logo} id="logo"/>
    
    
      
        <Col>
        <div>
        <CardImg src={`fridge.jpg`} alt="fridge" style={{height:500, width:800, top: 300, left: -50, position: "relative"}}/>
        <View style={{flexGrow: 0, backgroundImage:"fridge.jpg", height:500, width:300, overflow:"scroll", top: -200, left: 330}}>
          <FlatList 
            
            numColumns={3}
            data={foodItems}
            renderItem={(item) => (
            <Card style={{height: 100, width: 90}} onClick={() => clickFoodItem(item.item)}>
            <CardTitle>{item.item.name}</CardTitle>
            <img height="50p" src={`https://spoonacular.com/cdn/ingredients_100x100/${item.item.image}`} alt="FoodIcon" />
            </Card>
            )}
            extraData={foodItems}
          />
        </View>
          </div>
        </Col>
        <Col>
        <div id="box" style={{flexGrow: 0, height:500, width:400, overflow:"scroll", scrollbarWidth:"none"}}>
        {showFoundIngretients?
          <div>
          {(recipes.length > 0)?
            <>
            {recipes && recipes.map(el => 
            <>
            <Col>
            <label> {el.name} </label>
            </Col>
            <Col>
            <img alt="food" src={"https://spoonacular.com/cdn/ingredients_100x100/" + el.image} style={{ width: "10" }} />
            </Col>
            <Col>
            <Button onClick={() => appendFoodItems(el.name, el.is, el.image)}>
            Add
            </Button>
            </Col>
            </>)
            }
            </>
          :
            <label style={{color:"red"}}>
            No ingredients found with this name
            </label>
          }
          </div>
        :
          <div>
          {showRecipes?
            <Recipe recipes={recipes}/>
          :
            <div>
            {error? 
              <label style={{color:"red"}}>
              {error}
              </label>
            : 
              <>
              </>
            }
            </div>
          }
          </div>
      }
 
          
          

          </div>
        </Col>
        <Col>
          <Row>
          {clickedRecipes? 
            <Form onSubmit={submitRecipesHandler}>
              <FormGroup>
                  <Label>Preferences</Label>
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
              <Button>Show Recipes</Button>
            </Form> :
            <Button onClick={clickRecipesHandler}>Find Recipes</Button>}
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
          <Row>
          {clickedDelete? 
            <Button onClick={clickStopDeleteHandler} style={{color: "red"}}>Stop Deletion</Button>
            :
            <Button onClick={clickDeleteHandler}>Delete Ingredients</Button>
          }
          </Row>
          
        </Col>
      
      
    </> 
  );
}

export default Fridge
