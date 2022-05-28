import { Link } from 'react-router-dom';
import 'boxicons';
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
                        <Link to="/admin">
                            <box-icon
                                name="doughnut-chart"
                                type="solid"
                                color="#D4D4D4"
                            ></box-icon>
                            Dashboard
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/admin/projects">
                            <box-icon
                                name="hive"
                                // type="solid"
                                color="#FFFFFF"
                            ></box-icon>
                            Projects
                        </Link>
                    </li> */}
                </ul>
            </nav>
        </aside>
    );
};
