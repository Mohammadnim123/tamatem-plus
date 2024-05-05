import { Container, Alert } from "react-bootstrap";
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom'
import { ApiContext } from '../context/apis'
import { useEffect, useContext } from 'react'


export default function Login() {
    const navigate = useNavigate();
    const api = useContext(ApiContext)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const error = queryParams.get('error');
    async function login(e) {
        e.preventDefault();
        const form = {
            email: e.currentTarget[0].value,
            password: e.currentTarget[1].value,
        }
        const res = await api.signIn(form.email, form.password);
        if(!res){
            navigate('/?error=true')
        } 
    }

    useEffect(() => {
        if (!api.isLoading){
            if (api.isLoggedIn)
                navigate('/products')
        }
    }, [api.isLoggedIn,api.isLoading])

    return (
        <Container>
            <div className='login-page'>
                <div>
                    <img src={process.env.PUBLIC_URL + '/assets/tamatem-log.png'} alt="" />
                </div>
                <div className='body'>

                    {error && <Alert variant='danger'>
                        Wrong email or password
                    </Alert>}
                    <Form className='login-form' onSubmit={login}>
                        <div className='form-body'>
                            <h1>Login</h1>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control className='login-input' type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control className='login-input' type="password" placeholder="Password" />
                            </FloatingLabel>
                        </div>
                        <a>Forgot your Password?</a>
                        <Button className='login-btn' size="lg" type='submit'>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
    )
}
