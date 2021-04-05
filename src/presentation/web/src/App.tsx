import DateFnsUtils from '@date-io/date-fns';
import { Container, ThemeProvider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import plLocale from 'date-fns/locale/pl';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ActivationSent from './components/activationSent/ActivationSent';
import AnimalInfoCard from './components/animalInfoCard/AnimalInfoCard';
import AnimalInfoDescription from './components/animalInfoDescription/AnimalInfoDescription';
import Footer from './components/footer/Footer';
import ForgetPassword from './components/forgetPassword/ForgetPassword';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import About from './pages/About';
import Adoption from './pages/Adoption';
import Contact from './pages/Contact';
import Donation from './pages/Donation';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import theme from './themes/theme';
import AnimalInfo from './pages/AnimalInfo';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
                <Container style={{ marginTop: 64 }}>
                    <Router>
                        <Navbar />
                        <Grid container>
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
                                <Route exact path="/forget">
                                    <ForgetPassword />
                                </Route>
                                <Route exact path="/login">
                                    <Login />
                                </Route>
                                <Route exact path="/register">
                                    <Register />
                                </Route>
                                <Route exact path="/register/sent">
                                    <ActivationSent />
                                </Route>
                                <Route exact path="/animals/:animalId">
                                    <AnimalInfo />
                                </Route>
                                <Route path="*">
                                    <NotFound />
                                </Route>
                            </Switch>
                        </Grid>
                    </Router>
                </Container>
                <Footer />
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
};

export default App;
