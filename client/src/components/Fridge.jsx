import { Container, Row, Col, Form, FormGroup, Label, Input, CardImg, Button } from 'reactstrap';
import Recipe from './Recipe';
// import { useDispatch, useSelector, } from 'react-redux';
// import { ADD_ITEM } from '../redux/types/index';
// import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';

function Fridge() {

//   const dispatch = useDispatch();
//   const history = useHistory();     


  const [clicked, setClicked] = useState(false)
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [recipes, setRecipes] = useState([])

//   const mySize = useSelector(state => state.size)
//   const myColor = useSelector(state => state.color)
//   const myMaterial = useSelector(state => state.material)
//   const myBottomColor = useSelector(state => state.bottomColor)
//   const myHandleColor = useSelector(state => state.handleColor)
//   const [models, setModels] = useState([])
//   const [sizes, setSizes] = useState([])
//   const [proportions, setProportions] = useState({})
//   const [materials, setMaterials] = useState([])
//   const [colors, setColors] = useState([])
//   const [limit, setLimit] = useState(null)
  
  useEffect(() => {
    // fetch('http://localhost:3000/getInfo')
    // .then(response => response.json())
   
  }, [recipes])
//   const [totalPrice, setTotalPrice] = useState(0)

//   function changeModelHandler(e) {
//     fetch('http://localhost:3000/getSizesModelInfo', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({model: e.target.value})
//     })
//     .then(res => res.json())
//     .then(response => {
//       const newSizes = response.sizes
//       const newModel = response.model
//       setSizes(newSizes)
//       setProportions({height: newSizes[0].height, width: newSizes[0].width, depth: newSizes[0].depth, handleSize: newSizes[0].handleSize})
//       dispatch({
//         type: ADD_ITEM,
//         payload: {model: newModel}
//       })
//     })
//   }

//   function changeSizeHandler(e) {
//     fetch('http://localhost:3000/getProportions', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({model: myModel.name, sizeName: e.target.value})
//     })
//     .then(res => res.json())
//     .then(response => {
//       setProportions(response.proportions)
//     })
//   }

//   function changeMaterialHandler(e) {
//     fetch('http://localhost:3000/getMaterial', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({material: e.target.value})
//     })
//     .then(res => res.json())
//     .then(response => {
//       dispatch({
//         type: ADD_ITEM,
//         payload: {material: response}
//       })
//     })
//   }
  
//   function changeColorHandler(e) {
//     fetch('http://localhost:3000/getColor', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({color: e.target.value})
//     })
//     .then(res => res.json())
//     .then(response => {
//       let payload = {};
//       const classNam = e.target.className.split(" ")[0]
//       if (classNam === "color") {
//         payload = {color: response};
//       } else if (classNam === "bottom") {
//         payload = {bottomColor: response};
//       } else if (classNam === "handles") {
//         payload = {
//           ...payload,
//           handleColor: response
//         };
//       }
//       dispatch({
//         type: ADD_ITEM,
//         payload: payload
//       })
//     })
//   }

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
  e.preventDefault()
  fetch('http://localhost:3000/getRecipes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, amount})
    })
    .then(res => res.json())
    .then(res => setRecipes(res))
  setClicked(false)
}

  return (
    <>
      <Row>
        <Col>
          <CardImg src={`fridge.jpg`} alt="fridge" />
        </Col>
        <Col>
          <Row>
          {clicked? 
            <Form onSubmit={submitHandler}>
              <FormGroup>
                <Label>food name</Label>
                <Input onChange={changeFoodHandler} className={"name"} type="text" required/>
              </FormGroup>
              <FormGroup>
                <Label>amount</Label>
                <Input onChange={changeAmountHandler} className={"amount"} type="text" required/>
              </FormGroup>
              <Button>Add</Button>
            </Form> :
            <Button onClick={clickHandler}>Add food</Button>}
          </Row>
          <Row>
          <Recipe recipes={recipes}/>
          </Row>
        </Col>
      </Row>
    </> 
  );
}

export default Fridge
