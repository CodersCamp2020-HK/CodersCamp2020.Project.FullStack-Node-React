import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SurveyForm from "./SurveyForm";
import { AdoptionStep, ApiError, useGetForm } from "../../../client";
import { UseGetReturn } from "restful-react";
import { act } from "react-dom/test-utils";

interface IUseGetFormParams {
    animalId: number;
    requestOptions: {
        headers: {
            access_token: string;
        };
    };
    mock: {
        data: AdoptionStep;
        error: undefined;
        loading: boolean;
    };
}

const mockHandleSubmit = jest.fn();
const useGetFormParams = {
    animalId: 1, 
    requestOptions: { headers: { access_token: '' }},
    mock: {
        data: {
            name: "Krok 1 - wypełnienie formularza",
            number: 1,
            description: "Krok zawierający formularz adopcyjny dla psa. Wymagany do adopcji",
            form: {
                id: 1,
                name: 'Formularz adopcji psa',
                questions: [
                    {
                        id: 1,
                        placeholder: {
                            type: 'radio',
                            answer: ['Tak', 'Nie']
                        },
                        question: 'Czy mają państwo dzieci?'
                    },
                    {
                        id: 5,
                        placeholder: {
                            type: 'text',
                            answer: '...'
                        },
                        question: 'Czemu akurate teraz zdecydowali się Państwo na adopcję psa?'
                    },
                    {
                        id: 8,
                        placeholder: {
                            type: 'checkbox',
                            answer: ['Aktywny', 'Leniwy', 'Groźny', 'Szczekający']
                        },
                        question: 'Jakie cechy według Państwa powinien mieć pies?'
                    }
                ]
            }
        } as unknown as AdoptionStep,
        error: undefined,
        loading: false
    }
};
const setup = (data: IUseGetFormParams) => {
    let mockedData = {};
    const TestComponent = () => {
        Object.assign(mockedData, useGetForm(data));
        return null;
    }
    render(<TestComponent />);
    return mockedData as UseGetReturn<AdoptionStep, ApiError | Error, void, unknown>;
}

describe('Given: SurveyForm() with questions and submit', () => {
    beforeEach(() => {
        const mockFormData = setup(useGetFormParams);
        render(<SurveyForm handleSubmit={mockHandleSubmit} formData={mockFormData} />)
    })
    describe('When: form is loaded', () => {
        it('Then: questions should be generated', () => {
            expect(screen.getByText(/1\. czy mają państwo dzieci\?/i)).toBeInTheDocument();
            expect(screen.getByRole('radiogroup')).toBeInTheDocument();
            expect(screen.getAllByRole('radio')).toHaveLength(2);

            expect(screen.getByText(/2\. czemu akurate teraz zdecydowali się państwo na adopcję psa\?/i)).toBeInTheDocument();
            expect(screen.getByRole('textbox')).toBeInTheDocument();
            
            expect(screen.getByText(/3\. jakie cechy według państwa powinien mieć pies\?/i)).toBeInTheDocument();
            expect(screen.getAllByRole('checkbox')).toHaveLength(4);
        })
    })
    describe('When: form is loaded, inputs are not provided and submit button is clicked', () => {
        it('Then: validation errors to provide inputs should be displayed', async () => {
            fireEvent.submit(screen.getByRole('button', {name: /wyślij formularz/i}));
            expect(await screen.findAllByText(/Zaznacz odpowiedź/i)).toHaveLength(2);
            expect(await screen.findAllByText(/Napisz odpowiedź/i)).toHaveLength(1);
        })
    })
    describe('When: form is loaded, inputs are not provided and submit button is clicked', () => {
        it('Then: validation errors to provide inputs should be displayed', async () => {
            fireEvent.submit(screen.getByRole('button', {name: /wyślij formularz/i}));
            expect(await screen.findAllByText(/Zaznacz odpowiedź/i)).toHaveLength(2);
            expect(await screen.findAllByText(/Napisz odpowiedź/i)).toHaveLength(1);
        })
    })
})