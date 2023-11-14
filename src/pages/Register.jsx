import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { Link, Navigate } from 'react-router-dom';

function Register() {
  const ctx = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    ctx.handleRegister(name, email, password);
  };

  return (
    <div className="max-w-7xl flex flex-col items-center mt-10">
      {ctx.userData && <Navigate to="/" replace={true} />}
      <form onSubmit={handleSubmit} className="flex flex-col w-96 gap-4">
        <input className="border border-black rounded" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border border-black rounded" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border border-black rounded" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="transition-all border border-neutral-700 bg-slate-400 hover:bg-slate-700 hover:text-white active:bg-slate-950">Register</button>
      </form>
      <Link to="/login">Already have account?</Link>
    </div>
  );
}

export default Register;
