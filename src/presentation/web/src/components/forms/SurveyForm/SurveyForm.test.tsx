import React from "react";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import SurveyForm from "./SurveyForm";
import { AdoptionStep, useGetForm } from "../../../client";

const mockHandleSubmit = jest.fn();
const mockFormData = useGetForm({
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
});

describe('Given: SurveyForm() without default values', () => {
    beforeEach(() => {
        render(<SurveyForm handleSubmit={mockHandleSubmit} formData={mockFormData} />)
    })
})