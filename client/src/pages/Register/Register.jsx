import {Row,Col,Form,Stack,Button,Alert} from 'react-bootstrap'
import { Contexts } from '../../context/context'
import axios from 'axios'
import { useEffect } from 'react'

function Register() {
let {HandleChangeRegister,UserRegisterInfo,HandleRegError,RegistrationLoading,SetRegistrationLoading,SetRegisterError,RegsiterError,RegisterPostResponse,SetRegisterPostResponse}=Contexts()
let URI = process.env.REACT_APP_HOSTING_URI || process.env.REACT_APP_LOCAL_URI
const HandlingRegistration=async(Data)=>{
const res = await axios.post(URI+'/user/register',Data).catch((error)=>{
console.log(error)
}).then((res)=>{
  console.log(RegisterPostResponse);
  SetRegisterPostResponse(res.data)
  if(res.data.message!="sucess") SetRegisterError(res.data.message)
    console.log(RegsiterError);
})
}
  return<>
<Form>
<Row>
<Col>
<Stack gap={3}>
<h3>Register</h3>
<Form.Control  type='text' placeholder='Name' name="name" onChange={(e)=>{HandleChangeRegister({...UserRegisterInfo,name:e.target.value})}}/>
<Form.Control  type='Email'  placeholder='Email' name="email"  onChange={(e)=>{HandleChangeRegister({...UserRegisterInfo,email:e.target.value})}}/>
<Form.Control  type='password' placeholder='Password' name='password' onChange={(e)=>{HandleChangeRegister({...UserRegisterInfo,password:e.target.value})}}/>
<Button onClick={()=>HandlingRegistration(UserRegisterInfo)}>Register</Button>
{}
{RegistrationLoading ? <Alert variant='danger'>
    <p>
     Creating the Accont ....
    </p>
</Alert>:null
}
{RegsiterError ? <Alert variant='danger'>
    <p>
     {RegsiterError}
    </p>
</Alert> :null}
{/* Handeling time for error alert */}
{ HandleRegError()}


</Stack>
</Col>
</Row>


</Form>
  
  </>
}

export default Register