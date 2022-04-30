import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="text-gray-200 navbar">
            <div className="navbar-start">
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact me</Link>
            </div>
        </nav>
    );
};
