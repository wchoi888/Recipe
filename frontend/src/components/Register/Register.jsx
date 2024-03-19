import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';
import './Register.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const result = await registerUser(username, email, password);
      console.log('Registration successful:', result);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="RegisterWrapper">
      <div className="RegisterContainer">
        <h2 className="RegisterTitle">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="Input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <button className="RegisterButton" type="submit">Register</button>
        </form>
        <button className="LoginButton" onClick={navigateToLogin}>Already have an account? Login</button>
      </div>
    </div>
  );
};

export default Register;
