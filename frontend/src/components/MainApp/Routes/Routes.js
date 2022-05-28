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
                <Route
                    path="/"
                    element={[
                        <Navbar key="index-navbar" />,
                        <Home key="home-page" />,
                        <Footer key="index-footer" />,
                    ]}
                />
                <Route
                    path="/about"
                    element={[
                        <Navbar key="about-navbar" />,
                        <About key="about-page" />,
                        <Footer key="about-footer" />,
                    ]}
                />
                <Route
                    path="/projects"
                    element={[
                        <Navbar key="projects-navbar" />,
                        <Projects key="projects-page" />,
                        <Footer key="projects-footer" />,
                    ]}
                />
                <Route
                    path="/contact"
                    element={[
                        <Navbar key="contact-navbar" />,
                        <Contact key="contact-page" />,
                        <Footer key="contact-footer" />,
                    ]}
                />
            </Routes>
        </BrowserRouter>
    );
};
