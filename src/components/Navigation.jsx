import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function Navigation() {
  const { handleLogout, userData } = useContext(UserContext);

  return (
    <nav className="h-16 px-4 w-full flex gap-2 bg-neutral-600 text-white items-center justify-between">
      <ul className="flex gap-2">
        <li className="logo">Logo</li>
        <li>
          <NavLink to={'/'}>Todos</NavLink>
        </li>
      </ul>
      <ul className="flex gap-2 ">
        <li>{userData ? <button onClick={handleLogout}>Logout</button> : <Link to="/login">login</Link>}</li>
      </ul>
    </nav>
  );
}

export default Navigation;
