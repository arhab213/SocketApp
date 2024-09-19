import {Row,Col,Stack,Form,Button,Alert} from 'react-bootstrap'
import { Contexts } from '../../context/context'
import axios from 'axios'
function Login() {
let {HandleChangeLogin,UserInfoLogin,
  LoginPostResponse,SetLoginPostResponse,SetUserAsItem}=Contexts()
let URI=process.env.REACT_APP_HOSTING_URI || process.env.REACT_APP_LOCAL_URI
// posting the request 
const HandleLogin=async(Data)=>{
const res =await axios.post(URI+'/user/login',Data).catch((error)=>{console.log(error)}).then((res)=>{
SetLoginPostResponse(res.data)
SetUserAsItem()
})}
return <>
<Row>
<Col>
<Stack gap={3}>
<Form.Control type='email' placeholder="email" onChange={(e)=>HandleChangeLogin({...UserInfoLogin,email:e.target.value})} />
<Form.Control type='password'  placeholder="password" onChange={(e)=>HandleChangeLogin({...UserInfoLogin,password:e.target.value})} />
<Button onClick={()=>HandleLogin(UserInfoLogin)}>Login</Button>
</Stack>
</Col>
</Row>
  </>
}
export default Login