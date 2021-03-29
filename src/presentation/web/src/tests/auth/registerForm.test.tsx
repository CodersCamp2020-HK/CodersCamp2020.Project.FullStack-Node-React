import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import RegisterForm from '../../components/auth/registerForm/RegisterForm';

const mockRegister = jest.fn((name, surname, mail, password, repPassword, birthDate, phone) => {
    return Promise.resolve({ name, surname, mail, password, repPassword, birthDate, phone });
});

describe('Given: RegisterForm()', () => {
    beforeEach(() => {
        render(<RegisterForm />)
    })
    afterEach(cleanup)

    describe('When: all fields have default values', () => {
        it('Then: required error message should be displayed for all fields except date', async () => {
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/wymagan/i)).toHaveLength(6);
        })
    })
    describe('When: name has 1 letter', () => {
        it('Then: min length error message should be displayed', async () => {    
            fireEvent.input(screen.getByRole('textbox', { name: 'Imię' }), { target: { value: 'a' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Imię za krótkie/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Imię'}).value).toBe('a');
        })
    })
    describe('When: name has 51 letters', () => {
        it('Then: max length error message should be displayed', async () => {    
            fireEvent.input(screen.getByRole('textbox', { name: 'Imię' }), { target: { value: 'a'.repeat(51) }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Imię za długie/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Imię'}).value).toBe('a'.repeat(51));
        })
    })
    describe('When: surname has 1 letter', () => {
        it('Then: min length error message should be displayed', async () => {    
            fireEvent.input(screen.getByRole('textbox', { name: 'Nazwisko' }), { target: { value: 'a' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Nazwisko za krótkie/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Nazwisko'}).value).toBe('a');
        })
    })
    describe('When: surname has 51 letters', () => {
        it('Then: max length error message should be displayed', async () => {    
            fireEvent.input(screen.getByRole('textbox', { name: 'Nazwisko' }), { target: { value: 'a'.repeat(51) }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Nazwisko za długie/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Nazwisko'}).value).toBe('a'.repeat(51));
        })
    })
    describe('When: email has no at sign(@)', () => {
        it('Then: invalid email error message should be displayed', async () => {    
            fireEvent.input(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'eloelo.elo' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Nieprawidłowy email!/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Email'}).value).toBe('eloelo.elo');
        })
    })
    describe('When: email has no domain', () => {
        it('Then: invalid email error message should be displayed', async () => {    
            fireEvent.input(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'elo@.elo' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Nieprawidłowy email!/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Email'}).value).toBe('elo@.elo');
        })
    })
    describe('When: email has wrong domain', () => {
        it('Then: invalid email error message should be displayed', async () => {    
            fireEvent.input(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'elo@.elo' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Nieprawidłowy email!/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Email'}).value).toBe('elo@.elo');
        })
        it('Then: invalid email error message should be displayed', async () => {    
            fireEvent.input(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'elo@elo.' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Nieprawidłowy email!/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Email'}).value).toBe('elo@elo.');
        })
    })
    describe('When: password has less than 8 characters', () => {
        it('Then: invalid password message should be displayed', async () => {
            fireEvent.input(screen.getByLabelText(/Hasło/), { target: { value: 'a'.repeat(7) }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Hasło musi zawierać/i)).toHaveLength(1);
            expect(screen.getByLabelText(/Hasło/).value).toBe('a'.repeat(7))
        })
    })
    describe('When: password has 8 lowercase characters', () => {
        it('Then: invalid password message should be displayed', async () => {
            fireEvent.input(screen.getByLabelText(/Hasło/), { target: { value: 'a'.repeat(8) }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Hasło musi zawierać/i)).toHaveLength(1);
            expect(screen.getByLabelText(/Hasło/).value).toBe('a'.repeat(8))
        })
    })
    describe('When: password has 8 uppercase characters', () => {
        it('Then: invalid password message should be displayed', async () => {
            fireEvent.input(screen.getByLabelText(/Hasło/), { target: { value: 'A'.repeat(8) }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Hasło musi zawierać/i)).toHaveLength(1);
            expect(screen.getByLabelText(/Hasło/).value).toBe('A'.repeat(8))
        })
    })
    describe('When: password has 4 lowercase characters, 4 uppercase characters and number', () => {
        it('Then: invalid password message should be displayed', async () => {
            fireEvent.input(screen.getByLabelText(/Hasło/), { target: { value: 'a'.repeat(4) + 'A'.repeat(4) + '5' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Hasło musi zawierać/i)).toHaveLength(1);
            expect(screen.getByLabelText(/Hasło/).value).toBe('a'.repeat(4) + 'A'.repeat(4) + '5')
        })
    })
    describe('When: password has 4 lowercase characters, 4 uppercase characters and special character', () => {
        it('Then: invalid password message should be displayed', async () => {
            fireEvent.input(screen.getByLabelText(/Hasło/), { target: { value: 'a'.repeat(4) + 'A'.repeat(4) + '!' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Hasło musi zawierać/i)).toHaveLength(1);
            expect(screen.getByLabelText(/Hasło/).value).toBe('a'.repeat(4) + 'A'.repeat(4) + '!')
        })
    })
})