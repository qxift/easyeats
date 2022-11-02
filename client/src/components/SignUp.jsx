import { Container, Row, Col, Form, FormGroup, Label, Input, CardImg, Button, FormText } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom'
// import { ADD_ITEM } from '../redux/types/index';

function SignUp(){

  const dispatch = useDispatch();
  const history = useHistory();   

//   const imagePath = useSelector(state => state.imagePath)
//   const text = useSelector(state => state.text)


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
//   const [color, setColor] = useState("")
//   const [price, setPrice] = useState("")
//   const [colors, setColors] = useState([])
//   const [numImgColors, setNumImgColors] = useState([])
//   const [imageHeight, setImageHeight] = useState("200")
//   const [textSize, setTextSize] = useState("20")
//   const [bold, setBold] = useState(false)
//   const [italic, setItalic] = useState(false)
//   const [font, setFont] = useState("serif")
//   const [imageColors, setImageColors] = useState([])
//   const [textColor, setTextColor] = useState("Натуральный")

//   const fonts = ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "math", "emoji", "fangsong"]
  
//   useEffect(() => {
//     fetch('http://localhost:3000/getBag')
//     .then(response => response.json())
//     .then((res) => {
//       setModel(res.model)
//       setMaterial(res.material)
//       setColor(res.color)
//       setPrice(res.price)
//     })
//     fetch('http://localhost:3000/getInfo')
//     .then(response => response.json())
//     .then((res) => {
//       setColors(res.colors)
//     })
//   }, [])
  
// function changeHandler(e) {
//   const formData = new FormData()
//   const fileUploaded = e.target.files[0];
//   formData.append('image', fileUploaded)

//   fetch('http://localhost:3000/uploading', {
//       method: "POST",
//       body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//       dispatch({
//         type: ADD_ITEM,
//         payload: {imagePath: data.imagePath}
//       })
//     })
// }

// function heightChangeHandler(e) {
//   setImageHeight(`${e.target.value}`)
// }

// function textChangeHandler(e) {
//   dispatch({
//       type: ADD_ITEM,
//       payload: {text: e.target.value}
//     })
//   }

// function textSizeChangeHandler(e) {
//   const textS = e.target.value
//   setTextSize(`${textS}`)
//   setPrice(prev => prev + textS)
// }

// function colorChangeHandler(e) {
//   if(+e.target.value) {
//     const newArr = new Array(+e.target.value).fill(0)
//     setNumImgColors(newArr)
//     setImageColors(new Array(+e.target.value).fill("Натуральный"))
//     setPrice(prev => prev * newArr.length)
//   } else {
//     setNumImgColors([])
//     setImageColors([])
//   }
// }

// let diffX = 0;
// let diffY = 0;
// let imageX = 0;
// let imageY = 0;

// function dragStartHandler(e) {
//   diffX = e.clientX - imageX;
//   diffY = e.clientY - imageY;
// }

// function dragEndHandler(e) {
//   imageY = e.clientY - diffY;
//   imageX = e.clientX - diffX;
//   e.target.style.top = `${imageY}px`;
//   e.target.style.left = `${imageX}px`;
// } 

// function changeImageColors(e) {
//   const num = +e.target.className.split(" ")[0]
//   setPrice(prev => prev + 2)
//   setImageColors(prev => {
//     const newArr = [...prev]
//     newArr.splice(num-1, 1, e.target.value)
//     return newArr;
//     })
// }

// function changeTextColor(e) {
//   setTextColor(e.target.value)
//   setPrice(prev => prev + 2)
// }


// let diffTextX = 0;
// let diffTextY = 0;
// let textX = 0;
// let textY = 0;

// function dragTextStartHandler(e) {
//   diffTextX = e.clientX - textX;
//   diffTextY = e.clientY - textY;
// }

// function dragTextEndHandler(e) {
//   textY = e.clientY - diffTextY;
//   textX = e.clientX - diffTextX;
//   e.target.style.top = `${textY}px`;
//   e.target.style.left = `${textX}px`;
// } 

function changeUserHandler(e) {
  setUsername(e.target.value)
}

function changePassHandler(e) {
  setPassword(e.target.value)
}

function submitHandler(e) {
  e.preventDefault();  
  fetch('http://localhost:3000/signUp', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    .then(history.push('/fridge'))
}

  return (
    <Form onSubmit={submitHandler}>
      <FormGroup>
        <Label>Username</Label>
        <Input onChange={changeUserHandler} className={"username"} type="text" required/>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input onChange={changePassHandler} className={"password"} type="text" required/>
      </FormGroup>
      <Button>Sign up</Button>
    </Form>
	)
}

export default SignUp;
