import React from 'react';
import { Container, ThemeProvider } from '@material-ui/core';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import About from './pages/About';
import Adoption from './pages/Adoption';
import Contact from './pages/Contact';
import Donation from './pages/Donation';
import Auth from './pages/Auth';
import Home from './pages/Home';
import theme from './themes/theme';
import Footer from './components/footer/Footer';
import NotFound from './pages/NotFound';
import GridContainer from './components/gridContainer/GridContainer';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import DateFnsUtils from '@date-io/date-fns';
import plLocale from 'date-fns/locale/pl';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
                <Container style={{ marginTop: 64 }}>
                    <Router>
                        <Navbar />
                        <GridContainer>
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
                                <Route path="/auth">
                                    <Auth />
                                </Route>
                                <Route path="*">
                                    <NotFound />
                                </Route>
                            </Switch>
                        </GridContainer>
                    </Router>
                </Container>
                <Footer />
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
};

export default App;
