import React from 'react';
import './App.css';
import theme from './themes/theme';
import { Container, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Home from './components/Pages/Home';
import Donation from './components/Pages/Donation';
import Adoption from './components/Pages/Adoption';
import Navbar from './components/Navbar/Navbar';
import TextInput from './components/textInput/TextInput';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <TextInput id="name" label="Imię" type="date" />
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
