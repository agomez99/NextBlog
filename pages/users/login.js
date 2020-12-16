import { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router'
import { TextInput, Field, Label } from 'tailwind-react-ui'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    fire.auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log(err.code, err.message)
        setNotification(err.message)
        setTimeout(() => {
          setNotification('')
        }, 2000)
      })
    setUsername('')
    setPassword('')
    router.push("/")
  }
  return (
    <div>
      <h1>Login</h1>
      {notify}
      <form onSubmit={handleLogin}>

      <Field>
          <Label>Email</Label>
           <TextInput name="name" type="text" value={username} 
        onChange= {({target}) => setUsername(target.value)} />
        <br />
          <Label>Password</Label>
           <TextInput name="name" type="text" value={password} 
        onChange= {({target}) => setPassword(target.value)} />
      </Field>

        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login