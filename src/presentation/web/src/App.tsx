import { makeStyles, ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';
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
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import theme from './themes/theme';
import { UserType } from './client/index';

const useStyles = makeStyles({
    wrapper: {
        marginTop: 70,
    },
});

interface AppContextInterface {
    appState: AppState;
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

export const AppCtx = React.createContext<AppContextInterface>(null!);

interface AppState {
    userId: number | null;
    isLogged: boolean;
    role: UserType | null;
}
const initialAppState = {
    userId: null,
    isLogged: false,
    role: null,
};

const App: React.FC = () => {
    const classes = useStyles();
    const [appState, setAppState] = useState<AppState>(initialAppState);

    return (
        <AppCtx.Provider value={{ appState, setAppState }}>
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
        </AppCtx.Provider>
    );
};

export default App;
