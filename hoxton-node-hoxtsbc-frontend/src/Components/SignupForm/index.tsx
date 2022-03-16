import React from 'react'
import Button from '../Button';
import TextField from '../TextField';
import * as api from '../../utils/api';
import './style.css';
type State = {
  email: string;
  password: string;
  fullName: string;
}

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const SignupForm = ({ isOpen, handleClose }: Props) => {
  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
    fullName: ''
  });
  const [error, setError] = React.useState<string>('');

  const getHandleChange = React.useCallback((key: keyof State) => {

    return (val: string) => setValues({ ...values, [key]: val });
  }, [setValues, values])

  const handleSubmit = React.useCallback((event) => {
    event.preventDefault()
    return api.handleSignUp(values).then((r: any) => {
      
      if (r?.error) return setError(r?.error);

      // feel free to improve the UX ;)
      handleClose();
    })
  }, [values])

  const handleCloseModal = React.useCallback((event) => {
    if (event.target === event.currentTarget) handleClose();
  }, [handleClose])

  if (!isOpen) return null;

  return (
    <div className="SignupForm_modal" onClick={handleCloseModal}>
      <form className='SignupForm_form'>
        <TextField value={values.email} placeholder='Email' required handleChange={getHandleChange('email')} />
        <TextField value={values.password} placeholder='Password' required type='password' handleChange={getHandleChange('password')} />
        <TextField value={values.fullName} placeholder='Full name' handleChange={getHandleChange('fullName')} />

        {error && <p className='error-message'>{error}</p>}
        <Button type='submit' text="Register" handleClick={handleSubmit} />
      </form>
    </div>
  )
}

export default SignupForm
