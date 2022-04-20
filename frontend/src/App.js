import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminProjects from './components/Admin/Projects/AdminProjects';

import { Navbar } from './components/MainApp/Navigation/Navbar';
import { Footer } from './components/MainApp/Navigation/Footer';
import { Home } from './components/MainApp/Home/Home';
import { Projects } from './components/MainApp/Projects/Projects';
import { AboutMe } from './components/MainApp/About/AboutMe';
import { Contact } from './components/MainApp/Contact/Contact';

const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/projects" element={<Projects />} />
                    <Route exact path="/about" element={<AboutMe />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/admin" element={<AdminProjects />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
};

export default App;
