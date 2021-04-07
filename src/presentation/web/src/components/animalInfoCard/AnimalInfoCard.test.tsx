import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimalActiveLevel, AnimalSize, useGetAllWillignessesToAdoptCount, useGetAnimal } from '../../client/index';
import AnimalInfoCard, { ADOPTION_PROCESS_PAGE, ADOPT_PAGE } from './AnimalInfoCard';
jest.mock('../../client/index');

let documentBody: RenderResult;
let mockUseGetAnimal;
let mockUseGetAllWillignessesToAdoptCount;

const exampleAnimal = {
    id: 1,
    name: 'Feliks',
    age: 11,
    additionalInfo: {
        id: 1,
        admissionToShelter: '2011.04.17',
        size: 'small' as AnimalSize,
        acceptsKids: false,
        acceptsOtherAnimals: true,
        activeLevel: 'low' as AnimalActiveLevel,
        temporaryHome: false,
        needDonations: true,
        virtualAdoption: false,
        adoptionDate: '',
    },
};

const exampleCount = {
    description: 'Adopters count',
    count: 36,
};

describe('Render animal card', () => {
    beforeEach(() => {
        mockUseGetAnimal = useGetAnimal as jest.MockedFunction<typeof useGetAnimal>;
        mockUseGetAllWillignessesToAdoptCount = useGetAllWillignessesToAdoptCount as jest.MockedFunction<
            typeof useGetAllWillignessesToAdoptCount
        >;
        mockUseGetAnimal.mockReturnValue({ ...jest.requireActual('../../client/index'), data: { ...exampleAnimal } });
        mockUseGetAllWillignessesToAdoptCount.mockReturnValue({
            ...jest.requireActual('../../client/index'),
            data: { ...exampleCount },
        });
        documentBody = render(
            <BrowserRouter>
                muiWrapper(
                <AnimalInfoCard animalId={1} />)
            </BrowserRouter>,
        );
    });

    it('show animal name', () => {
        const name = documentBody.getByText(exampleAnimal.name, { selector: 'h2' });
        expect(name).toBeInTheDocument();
    });

    it('show 8 table rows', () => {
        const firstColumn = documentBody.container.querySelectorAll('th');
        const secondColumn = documentBody.container.querySelectorAll('td');
        expect(firstColumn.length).toEqual(8);
        expect(secondColumn.length).toEqual(8);
    });

    it('show id, age and applicant count', async () => {
        expect(await documentBody.findByText(exampleAnimal.id.toString(), { selector: 'h6' })).toBeInTheDocument();
        expect(
            await documentBody.findByText(exampleAnimal.age.toString() + ' msc.', { selector: 'h6' }),
        ).toBeInTheDocument();
        expect(await documentBody.findByText(exampleCount.count.toString(), { selector: 'h6' })).toBeInTheDocument();
    });

    it('show adoption step button', async () => {
        const adoptionStepButton = documentBody.getByText('Proces adopcyjny');
        expect(adoptionStepButton).toBeInTheDocument();
    });
    it('show adopt button', async () => {
        const adoptionButton = documentBody.getByText('Adoptuj');
        expect(adoptionButton).toBeInTheDocument();
    });

    it('show formatted date', async () => {
        const date = documentBody.getByText('17/04/2011');
        expect(date).toBeInTheDocument();
    });

    it('show proper size', async () => {
        const size = documentBody.getByText('mały');
        expect(size).toBeInTheDocument();
    });

    it('show proper active level', async () => {
        const activeLevel = documentBody.getByText('niska');
        expect(activeLevel).toBeInTheDocument();
    });

    it('show proper accepts kids', async () => {
        const acceptsKids = documentBody.getByText('nie');
        expect(acceptsKids).toBeInTheDocument();
    });

    it('show proper accepts other animals', async () => {
        const acceptsOtherAnimals = documentBody.getByText('tak');
        expect(acceptsOtherAnimals).toBeInTheDocument();
    });

    it('redirects to adoption process after click first button', async () => {
        const adoptionStepButton = documentBody.getByText('Proces adopcyjny');
        await act(() => {
            fireEvent.click(adoptionStepButton);
        });
        expect(window.location.pathname).toBe('/' + ADOPTION_PROCESS_PAGE);
    });

    it('redirects to animal adoption after click second button', async () => {
        const adoptionButton = documentBody.getByText('Adoptuj');
        await act(() => {
            fireEvent.click(adoptionButton);
        });
        expect(window.location.pathname).toBe('/' + ADOPT_PAGE);
    });
});
