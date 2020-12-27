import { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router'
import { Container, Row, Col, Navbar,Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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

    <Col style={{display:"grid", justifyContent:"center" }}>
      <h1 style={{marginTop:"20%" }} >Login</h1>
      {notify}
      {/* <form onSubmit={handleLogin}>
        Email<input type="text" value={username} 
        onChange= {({target}) => setUsername(target.value)} />
        <br />
        Password<input type="password" value={password} 
        onChange={({target}) => setPassword(target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
 */}
      <Form style={{width:"100%"}} onSubmit={handleLogin}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" value={username} 
        onChange= {({target}) => setUsername(target.value)} />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
    				</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" value={password} 
        onChange={({target}) => setPassword(target.value)} />
				</Form.Group>
				<Form.Group controlId="formBasicChecbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
  				</Button>
			</Form>
      </Col>
    </div>
  )
}
export default Login