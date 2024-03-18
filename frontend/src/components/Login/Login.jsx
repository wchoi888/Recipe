import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api';
import './Login.css';
import Auth from '../../utils/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();

        // mock login for development putposes
      if (process.env.NODE_ENV === "development") {
        console.log("Mock login for development");
        Auth.login("MockToken");
      } else { //bascially remove lines 15-19 when ready
        // actual login logic below:
        try {
          const response = await loginUser(email, password); 
          Auth.login(response.token);
        } catch (error) {
          console.error('Login failed:', error);
        }
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
