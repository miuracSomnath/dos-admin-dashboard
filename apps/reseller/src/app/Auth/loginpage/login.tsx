import './login.css';
import { Button } from '@mui/material';
import InputField from '../../../UI/input-field/input-field';
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../redux-tool/auth';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Prequisits } from '../registration/prequisits';

/* eslint-disable-next-line */
export interface LoginProps { }

export function Login(props: LoginProps) {

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (data: any) => {
    dispatch(loginUser(data))
    navigate("/home")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className='container'>
          <div className='form'>
            <div>
              <h3 style={{ color: "black", height: 60 }}>LOGIN  YOUR SELLER ACCOUNT</h3>
            </div>
            <InputField fullWidth color='primary' placeholder="Email id" type="text" formInput={{ ...register("email") }} />
            <InputField fullWidth color='primary' placeholder="Password" type="password" formInput={{ ...register("password") }} />
            <Button type='submit' variant='contained' color='primary' fullWidth style={{ height: 56 }} > Sign In</Button>
            <p style={{ textAlign: "center" }}>Don't have an account? <strong onClick={()=>navigate("/signup")} style={{color:'#167AF9', cursor: "pointer"}}>Sign Up</strong></p>
          </div>
        </div>
      </div>
      <Prequisits />
    </form>
  );
}

export default Login;