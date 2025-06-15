import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">TeamCollab</h1>
      <div className="space-x-4">
        <Link to="/">LandingPage</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/editor">Editor</Link>
        <Link to="/meet">Meet</Link>
        <Link to="/files">Files</Link>
      </div>
    </nav>
  );
};

export default Navbar;
