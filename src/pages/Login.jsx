import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';

function Login() {
  const ctx = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    ctx.handleLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}

export default Login;
