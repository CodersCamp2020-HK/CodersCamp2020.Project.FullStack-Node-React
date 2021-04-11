import { makeStyles, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import GridContainer from './components/gridContainer/GridContainer';
import Navbar from './components/navbar/Navbar';
import About from './pages/About';
import Adoption from './pages/Adoption';
import AnimalInfo from './pages/AnimalInfo';
import Auth from './pages/Auth';
import Contact from './pages/Contact';
import Donation from './pages/Donation';
import FormRoute from './pages/FormRoute';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import theme from './themes/theme';

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
                        <Route path="/adoption">
                            <GridContainer>
                                <Adoption />
                            </GridContainer>
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
                        <Route path="/animals/:animalId">
                            <AnimalInfo />
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
