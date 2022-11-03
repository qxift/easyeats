import { Container, Row, Col, Form, FormGroup, Label, Input, CardImg, Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom'

function SignIn() {

  const dispatch = useDispatch();
  const history = useHistory();   

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // const [model, setModel] = useState("")
  // const [sizeName, setSizeName] = useState("")
  // const [handlesColor, setHandlesColor] = useState(false)
  // const [bottomColor, setBottomColor] = useState(false)
  // const [material, setMaterial] = useState("")
  // const [color, setColor] = useState("")
  // const [price, setPrice] = useState("")
  // const [limit, setLimit] = useState("")
  // const [image, setImage] = useState("")
  // const [imageColors, setImageColors] = useState([])
  // const [text, setText] = useState("")
  // const [font, setFont] = useState("")
  // const [bold, setBold] = useState(false)
  // const [italic, setItalic] = useState(false)
  // const [textColor, setTextColor] = useState("")

  // const [name, setName] = useState("")
  // const [lastName, setLastName] = useState("")
  // const [email, setEmail] = useState("")
  // const [phone, setPhone] = useState("")
  // const [address, setAddress] = useState("")


  // useEffect(() => {
  //   fetch('http://localhost:3000/getFinalCheck')
  //   .then(response => response.json())
  //   .then((res) => {
  //     setModel(res.model)
  //     setSizeName(res.sizeName)
  //     setMaterial(res.material)
  //     setColor(res.color)
  //     setPrice(res.price)
  //     setLimit(res.numBags)
  //     if (res.bottomColor) {
  //       setBottomColor(res.bottomColor)
  //     }
  //     if (res.handlesColor) {
  //       setHandlesColor(res.handlesColor)
  //     }
  //     if (res.image) {
  //       setImage(res.image.name)
  //       setImageColors(res.image.colors)
  //     }
  //     if (res.text) {
  //       setText(res.text.name)
  //       setFont(res.text.font)
  //       setBold(res.text.bold)
  //       setItalic(res.text.italic)
  //       setTextColor(res.text.color.name)
  //     }
  //   })
  // }, [])

  function changeUserHandler(e) {
    setUsername(e.target.value)
  }
  
  function changePassHandler(e) {
    setPassword(e.target.value)
  }

  function submitHandler(e) {
    e.preventDefault()
    fetch('http://localhost:3000/signIn', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(res => {
      if (res.status == 200) {
        history.push('/fridge')
      } else {
        history.push('/signUp')
      }
    })
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
      <Button>Sign in</Button>
    </Form>
  );
}

export default SignIn
