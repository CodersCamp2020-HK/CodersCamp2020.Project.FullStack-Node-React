import React from 'react';
import { Container, ThemeProvider } from '@material-ui/core';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import About from './pages/About';
import Adoption from './pages/Adoption';
import Contact from './pages/Contact';
import Donation from './pages/Donation';
import Login from './pages/Login';
import Home from './pages/Home';
import theme from './themes/theme';
import Footer from './components/footer/Footer';
import ForgetPassword from './components/forgetPassword/ForgetPassword';
import NotFound from './pages/NotFound';
import GridContainer from './components/gridContainer/GridContainer';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
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
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </GridContainer>
                </Router>
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default App;
