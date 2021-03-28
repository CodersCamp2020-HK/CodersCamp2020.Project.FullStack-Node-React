import React, { useState } from 'react';
import FilterPanel from '../components/filterPanel/FilterPanel';
import Gallery from '../components/gallery/Gallery';

export const FormContex = React.createContext<context>({
    formState: {
        animal: 'dog',
        home: 'building',
        getAnimals: 'mam',
        getChildren: 'mam',
    },
    setFormState: () => {},
});

interface context {
    formState: FormState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

interface FormState {
    animal: string;
    home: string;
    getAnimals: string;
    getChildren: string;
}

const Home = () => {
    const [formState, setFormState] = useState<FormState>({
        animal: 'cat',
        home: 'building',
        getAnimals: 'Nie mam zwierząt',
        getChildren: 'Nie mam dzieci',
    });
    return (
        <div>
            <FormContex.Provider value={{ formState, setFormState }}>
                <FilterPanel />
                <Gallery />
            </FormContex.Provider>
        </div>
    );
};

export default Home;
