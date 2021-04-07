import React from 'react';
import { Container, ThemeProvider, makeStyles } from '@material-ui/core';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import About from './pages/About';
import Adoption from './pages/Adoption';
import Contact from './pages/Contact';
import Donation from './pages/Donation';
import FormRoute from './pages/FormRoute';
import Auth from './pages/Auth';
import Home from './pages/Home';
import theme from './themes/theme';
import Footer from './components/footer/Footer';
import NotFound from './pages/NotFound';
import GridContainer from './components/gridContainer/GridContainer';

const useStyles = makeStyles({
    wrapper: {
        marginTop: 70,
    },
});

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Navbar />
                <div className={classes.wrapper}>
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
                            <GridContainer>
                                <Contact />
                            </GridContainer>
                        </Route>
                        <Route path="/auth">
                            <GridContainer>
                                <Auth />
                            </GridContainer>
                        </Route>
                        <Route path="/form">
                            <GridContainer>
                                <FormRoute />
                            </GridContainer>
                        </Route>
                        <Route path="*">
                            <GridContainer>
                                <NotFound />
                            </GridContainer>
                        </Route>
                    </Switch>
                </div>
            </Router>
            <Footer />
        </ThemeProvider>
    );
};

export default App;
