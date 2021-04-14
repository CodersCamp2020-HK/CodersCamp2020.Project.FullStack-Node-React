import { makeStyles, ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/navbar/Navbar';
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
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import jwt from 'jsonwebtoken';
import MyAcc from './pages/MyAcc';
import PageInProgress from './pages/PageInProgress';

const useStyles = makeStyles({
    wrapper: {
        marginTop: 70,
    },
});

interface AppContextInterface {
    appState: AppState;
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const initialContext = {
    appState: {
        role: null,
        userId: null,
        userName: null,
    },
    setAppState: () => {},
};

export const AppCtx = React.createContext<AppContextInterface>(initialContext);

interface AppState {
    userId: number | null;
    role: UserType | null;
    userName: string | null;
}

interface IUserInfo {
    role: UserType;
    id: number;
    name: string;
    iat: number;
}

const isUserInfo = (user: unknown): user is IUserInfo => {
    return (
        typeof (user as IUserInfo).id === 'number' &&
        typeof (user as IUserInfo).role === 'string' &&
        typeof (user as IUserInfo).iat === 'number'
    );
};

const apiKey = localStorage.getItem('apiKey') !== null ? localStorage.getItem('apiKey') : null;

const decodedToken = apiKey !== null && process.env.JWT_KEY !== undefined ? jwt.verify(apiKey, process.env.JWT_KEY) : null;

const initialAppState =
    decodedToken && isUserInfo(decodedToken)
        ? {
              role: decodedToken.role,
              userId: decodedToken.id,
              userName: decodedToken.name,
          }
        : {
              role: null,
              userId: null,
              userName: null,
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
                            <Route path="/adoption">
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
                            <Route path="/account">
                                <MyAcc />
                            </Route>
                            <Route path="/animals/:animalId">
                                <AnimalInfo />
                            </Route>
                            <Route path="/work-in-progress">
                                <PageInProgress />
                            </Route>
                            <Route path="*">
                                <NotFound />
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
