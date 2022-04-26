import { Link } from 'react-router-dom';
import './styles/Navbar.css';

export const Navbar = () => {
    return (
        <aside>
            <input id="sideNav" type="checkbox" className="drawer-toggle" />
            <div>
                <label htmlFor="sideNav">Open drawer</label>
            </div>
            <nav className="drawer-side">
                <label htmlFor="sideNav" className="drawer-overlay"></label>
                <ul>
                    <li>
                        <Link to="/admin">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/projects">Projects</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
