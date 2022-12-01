import { Container, Spinner, Row, Col, Form, FormGroup, Label, Input, Card, CardTitle, CardImg, Button } from 'reactstrap';
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
  const [loading, setLoading] = useState(false)
  const [showFoundIngretients, setShowFoundIngretients] = useState(false)
  const [showRecipes, setShowRecipes] = useState(false)
  const [name, setName] = useState("")
  const [ing, setIng] = useState("")
  const [amount, setAmount] = useState("")
  const [foodItems, setFoodItems] = useState([])
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState("")
  const [ignorePantry, setIgnorePantry] = useState(false)
  const [maximize, setMaximizeUsed] = useState("Maximize used ingredients")
  
  const history = useHistory();   

  useEffect(() => {
    if (cookies.name) {
      fetch('http://localhost:3000/addToFridge', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: cookies.name, items: foodItems})
      })
      .then(res => res.json())
      // .then(response => response.json())
    } else {
      history.push('/signIn')
    }
  }, [foodItems])

  useEffect(() => {
    if (cookies.name) {
      fetch('http://localhost:3000/getFridge', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: cookies.name, items: foodItems})
      })
      .then(res => res.json())
      .then(res => setFoodItems(res.items))
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

const clickFoodItem = async (item) => {
  if(clickedDelete){
    const newFoodItems = foodItems
    newFoodItems.splice(foodItems.findIndex((el) => {return item == el}),1)
    setFoodItems(newFoodItems)

    const res = await fetch('http://localhost:3000/addToFridge', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: cookies.name, items: newFoodItems})
      })
      if (res.satus == 200) {
        const resp = await res.json()
      } else {
        //set error
      }
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
  setClickedAddFood(false)
  setClickedRecipes(false)
}

function clickStopDeleteHandler(e) {
  setClickedDelete(prev => false)
}

function clickRecipesHandler(e) {
  setIgnorePantry(false)
  setMaximizeUsed("Maximize used ingredients")
  setClickedDelete(false)
  setClickedAddFood(false)
  setClickedRecipes(prev => true)
}

function clickAddFoodHandler(e) {
  setClickedDelete(false)
  setClickedRecipes(false)
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
  e.preventDefault()
  setLoading(true)
  setRecipes([])
  setError("")
  if(foodItems.length > 0){
  const recipes = fetch('http://localhost:3000/getRecipes', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({username: cookies.name, maximize, ignorePantry})
  })
  .then(res => res.json())
  .then(res => {
    setLoading(false)
    if(res.recipes.length == 0) {
      setError("No recipes found for this ingredient")
    } else {
      setRecipes(res.recipes)
      //setFoodItems(foodItems.concat({name: name, key: foodItems.length}))
        }
    }) 
  }
  else{
    setLoading(false)
  }
  setClickedRecipes(false)
  setShowFoundIngretients(false)
  setShowRecipes(true)
}

function submitAddFoodHandler(e) {
  setError("")
  e.preventDefault()
  setLoading(true)
  const recipes = fetch('http://localhost:3000/getFoodMatches', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ing})
  })
  .then(res => res.json())
  .then(res => {
    setLoading(false)
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
        <CardImg src={`fridgefridge.png`} alt="fridge" style={{height:600, width:600, top: 300, left: 55, position: "relative"}}/>
        <View style={{flexGrow: 0, backgroundImage:"fridgefridge.png", height:500, width:300, overflow:"scroll", top: -200, left: 330}}>
          <FlatList 
            
            numColumns={3}
            data={foodItems}
            renderItem={(item) => (
            <Card style={{height: 100, width: 90, filter: clickedDelete? "brightness(50%)": "brightness(100%)"}} onClick={() => clickFoodItem(item.item)}>
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
        <Spinner style= {{zindex: 999}} color="warning" />
        <div id="box" style={{flexGrow: 0, height:500, width:450, top: 70, left: 10, position: "relative", overflow:"scroll", scrollbarWidth:"none"}}>
        {showFoundIngretients?
                <div>
                {loading?
                <label style={{color:"SteelBlue"}}>
                Loading
                </label>
                :
          <div>
          {(recipes.length > 0)?
            <>
            {recipes && recipes.map(el => 
            <>
            <Col>
            <label> {el.name} </label>
            </Col>
            <Col>
            <img alt="food" src={"https://spoonacular.com/cdn/ingredients_100x100/" + el.image} style={{ width: "100px" }} />
            </Col>
            <Col>
            <Button id="add" onClick={() => appendFoodItems(el.name, el.is, el.image)}>
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
          }
        </div>
        :
          <div>
          {showRecipes?
            <div>
            {loading?
            <label style={{color:"SteelBlue"}}>
            Loading...
           </label>
            :
              <div>
              {(recipes.length > 0)?
            <Recipe recipes={recipes}/>
            :
            <label style={{color:"red"}}>
              No recipes found
            </label>
            
            }
            </div>
            }

            </div>
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
          {clickedAddFood? 
            <Form onSubmit={submitAddFoodHandler}>
              <FormGroup>
                <Label id="recipes">Food name</Label>
                <Input id="foodbar"onChange={changeAddFoodHandler} className={"Name"} type="text" required/>
              </FormGroup>
              <Button id ="recipes">Add</Button>
            </Form> :
            <Button style={{top: clickedRecipes? "30px" : "-50px"}} id="recipes"onClick={clickAddFoodHandler}>Add Item</Button>}
          </Row>
          <Row>
          {clickedDelete? 
            <Button id ="recipes" onClick={clickStopDeleteHandler} style={{color: "red"}}>Stop Deletion</Button>
            :
            <Button id ="recipes" onClick={clickDeleteHandler}>Delete Ingredients</Button>
          }
          </Row>
          
          <Row>
      {clickedRecipes &&
        <> 
            <br></br>
            <br></br>
        </>}
          {clickedRecipes? 
            <Form onSubmit={submitRecipesHandler}>
              <FormGroup>
                  <Label id ="pref">Preferences</Label>
                  <Input id="maxin" onChange={(e) => setMaximizeUsed(e.target.value)} type="select">
                    <option>Maximize used ingredients</option>
                    <option>Minimize missing ingredients</option>
                  </Input>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input id="checkbox1" onClick={(e) => setIgnorePantry(prev => !prev)} type="checkbox" />{' '}
                    <span id="items">Ignore pantry items</span>
                  </Label>
                </FormGroup>
              <Button id="recipes">Show Recipes</Button>
            </Form> :
            <Button style={{top: "50px"}} id="recipes" onClick={clickRecipesHandler}>Find Recipes</Button>}
          </Row>
        </Col>
      
      
    </> 
  );
}

export default Fridge
