import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api'; 
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await loginUser(email, password); 
        localStorage.setItem('token', response.token); 
        navigate('/dashboard'); 
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
  
    const navigateToRegister = () => {
      navigate('/register');
    };

    return (
        <div className="LoginWrapper">
            <div className="LoginContainer">
                <h2 className="LoginTitle">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        className="Input"
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="Input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="LoginButton" type="submit">LOGIN</button>
                </form>
                <button className="SignUpButton" onClick={navigateToRegister}>SIGN UP</button>
            </div>
        </div>
    );
};

export default Login;
