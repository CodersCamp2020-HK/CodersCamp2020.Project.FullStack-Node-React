import React from 'react';
import './App.css';
import theme from './themes/theme';
import { Container, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './components/Pages/About';
import Adoption from './components/Pages/Adoption';
import Donation from './components/Pages/Donation';
import Contact from './components/Pages/Contact';
import Home from './components/Pages/Home';
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
        </ThemeProvider>
    );
};

export default App;
