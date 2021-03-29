import React, { FormEvent, useState, useEffect } from 'react';
import FilterPanel from '../components/filterPanel/FilterPanel';
import Gallery from '../components/gallery/Gallery';
import { useGet } from 'restful-react';

const initialState = {
    animal: 'cat',
    home: 'building',
    getChildren: 'Nie mam dzieci',
    getAnimals: 'Nie mam zwierząt',
};

interface IFormState {
    animal: string;
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
export const SubmitContext = React.createContext<IFormState>(initialState);

const Home = () => {
    console.log('render home');

    const [formState, setFormState] = useState<IFormState>(initialState);
    const [submitData, setSubmitData] = useState<IFormState>(initialState);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitData(formState);
    };

    return (
        <div>
            <FormContex.Provider value={{ formState, setFormState, handleSubmit }}>
                <FilterPanel />
            </FormContex.Provider>
            <SubmitContext.Provider value={submitData}>
                <Gallery />
            </SubmitContext.Provider>
        </div>
    );
};

export default Home;
