import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, Navigate } from 'react-router-dom';

function Login() {
  const ctx = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    ctx.handleLogin(email, password);
  };

  return (
    <div className="max-w-7xl flex flex-col items-center mt-10">
      {ctx.userData && <Navigate to="/" replace={true} />}
      <form onSubmit={handleSubmit} className="flex flex-col w-96 gap-4">
        <input className="border border-black rounded" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border border-black rounded" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="transition-all border border-neutral-700 bg-slate-400 hover:bg-slate-700 hover:text-white active:bg-slate-950">Login</button>
      </form>
      <Link to="/register">Dont have account?</Link>
    </div>
  );
}

export default Login;
