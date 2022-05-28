import { Link } from 'react-router-dom';
import './styles/Navbar.css';

export const Navbar = () => {
    return (
        <nav id="app-nav">
            <div id="logo">
                <p>Hey</p>
            </div>
            <div id="nav-items">
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact me</Link>
            </div>
            <div id="button-container">
                <button>Contact me</button>
            </div>
        </nav>
    );
};
