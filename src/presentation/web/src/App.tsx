import React from 'react';
import { Container, ThemeProvider } from '@material-ui/core';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import About from './components/pages/About';
import Adoption from './components/pages/Adoption';
import Contact from './components/pages/Contact';
import Donation from './components/pages/Donation';
import Home from './components/pages/Home';
import theme from './themes/theme';
import Footer from './components/footer/Footer';
import RegisterForm from './components/registerForm/RegisterForm';
import { RestfulProvider } from 'restful-react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <RestfulProvider base="http://localhost:8000/api">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Container style={{marginTop: 64}}>
                            <Router>
                                <Navbar />
                                <Switch>
                                    <Grid container>
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
                                        <Route exact path="/register">
                                            <RegisterForm />
                                        </Route>
                                        <Route exact path="/login">
                                            <Login />
                                        </Route>
                                    </Grid>
                                </Switch>
                            </Router>
                    </Container>
                </MuiPickersUtilsProvider>
            </RestfulProvider>
            <Footer />
        </ThemeProvider>
    );
};

export default App;
