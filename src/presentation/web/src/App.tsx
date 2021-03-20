import { Container, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import About from './components/Pages/About';
import Adoption from './components/Pages/Adoption';
import Contact from './components/Pages/Contact';
import Donation from './components/Pages/Donation';
import Home from './components/Pages/Home';
import theme from './themes/theme';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <Container style={{ backgroundColor: 'brown' }}>
                <Switch>
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
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </Container>
        </ThemeProvider>
    );
};

export default App;
