import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        // TODO ver como arranjar as rotas
        <nav className="text-gray-200">
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact me</Link>
        </nav>
    );
};
