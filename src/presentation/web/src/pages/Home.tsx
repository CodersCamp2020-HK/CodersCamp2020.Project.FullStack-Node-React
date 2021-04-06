import React, { FormEvent, useState, useEffect } from 'react';
import FilterPanel from '../components/filterPanel/FilterPanel';
import Gallery from '../components/gallery/Gallery';
import { useGet } from 'restful-react';
import { BrowserRouter as Router, Route, Link, useLocation, useParams } from 'react-router-dom';
import { GetAnimalsQueryParams } from '../client/index';

const initialState = {
    specie: 'cat',
    home: 'building',
    getChildren: 'Nie mam dzieci',
    getAnimals: 'Nie mam zwierząt',
};

const initialQuery = {};

interface IFormState {
    specie: string;
    home: string;
    getChildren: string;
    getAnimals: string;
}

interface IFormContex {
    formState: IFormState;
    setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
    handleSubmit: any; // ???
}

const initialContext = {
    formState: initialState,
    setFormState: () => {},
    handleSubmit: () => {},
};

export const FormContex = React.createContext<IFormContex>(initialContext);

const Home = () => {
    // console.log('render home');

    const [formState, setFormState] = useState<IFormState>(initialState);
    const [submitData, setSubmitData] = useState<IFormState>(initialState);
    const [query, setQuery] = useState<GetAnimalsQueryParams>(initialQuery);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitData(formState);
        setCurrentPage(1);
    };

    const myQuery: GetAnimalsQueryParams = {};

    const makeQuery = () => {
        submitData.specie === 'dog' && (myQuery.specie = 'dog');
        submitData.specie === 'cat' && (myQuery.specie = 'cat');
        submitData.getChildren === 'Mam dzieci' && (myQuery.acceptsKids = true);
        return myQuery;
    };

    useEffect(() => {
        setQuery(makeQuery());
    }, [submitData]);

    return (
        <div>
            <FormContex.Provider value={{ formState, setFormState, handleSubmit }}>
                <FilterPanel />
            </FormContex.Provider>
            <Gallery query={query} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default Home;
