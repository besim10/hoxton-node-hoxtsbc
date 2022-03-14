import React, { useState } from 'react'
import './style.css';
import Card from '../Card';
import Button from '../Button';
import TextField from '../TextField';

type Props = {
  handleLogin: (email: string, password: string) => void;
  handleToggleRegister: () => void;
}

const SignedOutPage = ({ handleLogin, handleToggleRegister }: Props): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleClickLogin = React.useCallback(() => {
    const res = handleLogin(email, password)
    console.log(res);
  },
    [email, password, handleLogin]
  );


  return (
    <>
      <Card text=' Please log in to access your account' header='Welcome to HoxtSBC'>
        <TextField handleChange={setEmail} value={email} type='email' name = 'email'  placeholder='Your email' />
        <TextField handleChange={setPassword} value={password} type='password' name = 'password' required placeholder='Your password'/>
        <div className='signedOutPage_button-container'>
          <Button text='Log in' handleClick={handleClickLogin} />
        </div>
      </Card>
      <Button text='Register' handleClick={handleToggleRegister} /></>
  )
}

export default React.memo(SignedOutPage);
