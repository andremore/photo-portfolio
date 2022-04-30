import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from '../Navigation/Navbar';
import { Footer } from '../Navigation/Footer';
import { Home } from '../Home/Home';
import { AboutMe as About } from '../About/AboutMe';
import { Projects } from '../Projects/Projects';
import { Contact } from '../Contact/Contact';

export const MainAppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={[<Navbar />, <Home />, <Footer />]} />
                <Route
                    path="/about"
                    element={[<Navbar />, <About />, <Footer />]}
                />
                <Route
                    path="/projects"
                    element={[<Navbar />, <Projects />, <Footer />]}
                />
                <Route
                    path="/contact"
                    element={[<Navbar />, <Contact />, <Footer />]}
                />
            </Routes>
        </BrowserRouter>
    );
};
