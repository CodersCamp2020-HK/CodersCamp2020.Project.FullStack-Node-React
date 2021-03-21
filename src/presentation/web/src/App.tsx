import React from 'react';
import './App.css';
import theme from './themes/theme';
import { Container, ThemeProvider } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import About from './components/pages/About';
import Adoption from './components/pages/Adoption';
import Donation from './components/pages/Donation';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import Footer from './components/footer/Footer';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Switch>
                <Navbar></Navbar>
                <Container style={{ backgroundColor: 'brown' }}>
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
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Container>
            </Switch>
            <Footer />
        </ThemeProvider>
    );
};

export default App;
