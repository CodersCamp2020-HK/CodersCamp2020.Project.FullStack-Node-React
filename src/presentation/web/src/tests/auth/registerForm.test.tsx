import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from '../../components/auth/registerForm/RegisterForm';

const mockRegister = jest.fn((name, surname, mail, password, repPassword, birthDate, phone) => {
    return Promise.resolve({ name, surname, mail, password, repPassword, birthDate, phone });
});

describe('Given: RegisterForm()', () => {
    describe('When: name is not provided', () => {
        beforeEach(() => render(<RegisterForm />))
        it('Then: required error message should be displayed', () => {
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(screen.getAllByRole("alert")).toHaveLength(1);
        })
    })
})