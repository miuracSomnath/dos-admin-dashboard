import { Button, Checkbox, FormControlLabel } from '@mui/material';
import InputField from '../../UI/input-field/input-field';
import './registration-password.css';
import { useState } from 'react';
import { RootState } from '../../redux-tool/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { createUser } from '../../redux-tool/auth';

/* eslint-disable-next-line */
export interface RegistrationPasswordProps {}

export function RegistrationPassword(props: RegistrationPasswordProps) {

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()
  
    
  const changed = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password") {
      setPassword(e.target.value)
    } else if(e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value)
    }
  }

  const userEmail = useSelector((state: RootState) => state.User.userDetails.email)

  const clicked = () => {
    if (password === confirmPassword) {
      dispatch(createUser({email:userEmail, password:password}))
    }
  }

  
  

  return (
    <div>
    <div className='container'>
        <div className='form'>
         <div>
            <h3 style={{ color: "black", height: 60 }}>CREATE YOUR SELLER ACCOUNT </h3>
          </div>
          <InputField fullWidth color='primary' placeholder="Enter Your Password" type="text" name='password' onChange={changed}/>
           <InputField fullWidth color='primary' placeholder="Confirm Your Password" type="text" name='confirmPassword' onChange={changed}/>
           <FormControlLabel control={<Checkbox onChange={()=>setChecked(!checked)} checked={checked} defaultChecked />} label="Agree DropOut Store Terms and Conditions" />
          <Button onClick={clicked} disabled={!checked} variant='contained' color='primary' fullWidth style={{ height: 56 }} > Sign Up</Button>
          <p style={{ textAlign: "center"}}>You alderdy have an account? <strong>Sign In</strong></p>
        </div>
        </div>
    </div>
  );
}

export default RegistrationPassword;
