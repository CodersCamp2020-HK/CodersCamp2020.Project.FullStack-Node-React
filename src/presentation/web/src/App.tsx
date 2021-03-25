import React from 'react';
import { Container, ThemeProvider } from '@material-ui/core';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import About from './pages/About';
import Adoption from './pages/Adoption';
import Contact from './pages/Contact';
import Donation from './pages/Donation';
import Home from './pages/Home';
import theme from './themes/theme';
import Footer from './components/footer/Footer';
import RegisterForm from './components/registerForm/RegisterForm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import ForgetPassword from './components/forgetPassword/ForgetPassword';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
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
                                        <Register />
                                    </Route>
                                    <Route exact path="/forget">
                                        <ForgetPassword />
                                    </Route>
                                    <Route exact path="/login">
                                        <Login />
                                    </Route>
                                    <Route path="*">
                                        <NotFound />
                                    </Route>
                                </Grid>
                            </Switch>
                        </Router>
                </Container>
            </MuiPickersUtilsProvider>            
            <Footer />
        </ThemeProvider>
    );
};

export default App;
