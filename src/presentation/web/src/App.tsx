import { Container, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import About from './components/pages/About';
import Adoption from './components/pages/Adoption';
import Contact from './components/pages/Contact';
import Donation from './components/pages/Donation';
import Home from './components/pages/Home';
import Slider from './components/slider/Slider';
import { photos } from './components/slider/mockImages';
import theme from './themes/theme';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Route exact path="/adoption">
                            <Adoption />
                        </Route>
                        <Route exact path="/donation">
                            <Donation />
                        </Route>
                        <Route exact path="/contact">
                            <Contact />
                        </Route>
                        <Route exact path="/testing">
                            <Slider photos={photos} />
                        </Route>
                    </Switch>
                </Router>
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default App;
