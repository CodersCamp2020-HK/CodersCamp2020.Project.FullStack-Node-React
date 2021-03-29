import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import RegisterForm from '../../components/auth/registerForm/RegisterForm';

const mockRegister = jest.fn((name, surname, mail, password, repPassword, birthDate, phone) => {
    return Promise.resolve({ name, surname, mail, password, repPassword, birthDate, phone });
});

describe('Given: RegisterForm()', () => {
    const handleSubmit = jest.fn();
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
    describe('When: repeat password has different value than password', () => {
        it('Then: invalid repeat password message should be displayed', async () => {
            fireEvent.input(screen.getByLabelText(/Hasło/), { target: { value: 'a'.repeat(4) + 'A'.repeat(4) + '!' }});
            fireEvent.input(screen.getByLabelText(/Powtórz hasło/), { target: { value: 'a'.repeat(4) + 'A'.repeat(4) }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Hasła muszą być takie same!/i)).toHaveLength(1);
            expect(screen.getByLabelText(/Hasło/).value).toBe('a'.repeat(4) + 'A'.repeat(4) + '!')
            expect(screen.getByLabelText(/Powtórz hasło/).value).toBe('a'.repeat(4) + 'A'.repeat(4))
        })
    })
    describe('When: phone number has less than 9 digits', () => {
        it('Then: invalid phone number error message should be displayed', async () => {    
            fireEvent.input(screen.getByRole('textbox', { name: 'Telefon' }), { target: { value: 12345678 }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Numer telefonu musi zawierać 9 cyfr!/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Telefon'}).value).toBe('12345678');
        })
    })
    describe('When: phone number has more than 9 digits', () => {
        it('Then: invalid phone number error message should be displayed', async () => {    
            fireEvent.input(screen.getByRole('textbox', { name: 'Telefon' }), { target: { value: 12345678910 }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Numer telefonu musi zawierać 9 cyfr!/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Telefon'}).value).toBe('12345678910');
        })
    })
    describe('When: phone number has 9 letters', () => {
        it('Then: invalid phone number error message should be displayed', async () => {    
            fireEvent.input(screen.getByRole('textbox', { name: 'Telefon' }), { target: { value: 'a'.repeat(9) }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Numer telefonu musi zawierać 9 cyfr!/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Telefon'}).value).toBe('a'.repeat(9));
        })
    })
    describe('When: input date is 29/02/2017 (dd/MM/yyyy)', () => {
        it('Then: invalid date format error message should be displayed', async () => {
            fireEvent.input(screen.getByRole('textbox', { name: 'Data urodzenia' }), { target: { value: '29/02/2017' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Podaj datę w formacie DD\/MM\/RRRR/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Data urodzenia'}).value).toBe('29/02/2017');
        })
    })
    describe('When: input date is 00/01/2021 (dd/MM/yyyy)', () => {
        it('Then: invalid date format error message should be displayed', async () => {
            fireEvent.input(screen.getByRole('textbox', { name: 'Data urodzenia' }), { target: { value: '00/01/2021' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Podaj datę w formacie DD\/MM\/RRRR/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Data urodzenia'}).value).toBe('00/01/2021');
        })
    })
    describe('When: input date is 32/01/2021 (dd/MM/yyyy)', () => {
        it('Then: invalid date format error message should be displayed', async () => {
            fireEvent.input(screen.getByRole('textbox', { name: 'Data urodzenia' }), { target: { value: '32/01/2021' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Podaj datę w formacie DD\/MM\/RRRR/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Data urodzenia'}).value).toBe('32/01/2021');
        })
    })
    describe('When: input date is 1/01/2021 (dd/MM/yyyy)', () => {
        it('Then: invalid date format error message should be displayed', async () => {
            fireEvent.input(screen.getByRole('textbox', { name: 'Data urodzenia' }), { target: { value: '1/01/2021' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Podaj datę w formacie DD\/MM\/RRRR/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Data urodzenia'}).value).toBe('10/12/021_');
        })
    })
    describe('When: input date is 15/00/2021 (dd/MM/yyyy)', () => {
        it('Then: invalid date format error message should be displayed', async () => {
            fireEvent.input(screen.getByRole('textbox', { name: 'Data urodzenia' }), { target: { value: '15/00/2021' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Podaj datę w formacie DD\/MM\/RRRR/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Data urodzenia'}).value).toBe('15/00/2021');
        })
    })
    describe('When: input date is 15/14/2021 (dd/MM/yyyy)', () => {
        it('Then: invalid date format error message should be displayed', async () => {
            fireEvent.input(screen.getByRole('textbox', { name: 'Data urodzenia' }), { target: { value: '15/14/2021' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Podaj datę w formacie DD\/MM\/RRRR/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Data urodzenia'}).value).toBe('15/14/2021');
        })
    })
    describe('When: input date is 15/1/2021 (dd/MM/yyyy)', () => {
        it('Then: invalid date format error message should be displayed', async () => {
            fireEvent.input(screen.getByRole('textbox', { name: 'Data urodzenia' }), { target: { value: '15/1/2021' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Podaj datę w formacie DD\/MM\/RRRR/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Data urodzenia'}).value).toBe('15/12/021_');
        })
    })
    describe('When: input date is 15/01/199 (dd/MM/yyyy)', () => {
        it('Then: invalid date format error message should be displayed', async () => {
            fireEvent.input(screen.getByRole('textbox', { name: 'Data urodzenia' }), { target: { value: '15/00/199' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Podaj datę w formacie DD\/MM\/RRRR/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Data urodzenia'}).value).toBe('15/00/199_');
        })
    })
    describe('When: input date is 15/01/2022 (dd/MM/yyyy)', () => {
        it('Then: invalid date format error message should be displayed', async () => {
            fireEvent.input(screen.getByRole('textbox', { name: 'Data urodzenia' }), { target: { value: '15/01/2022' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Podaj wcześniejszą datę/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Data urodzenia'}).value).toBe('15/01/2022');
        })
    })
    describe('When: input date is 15/1/1899 (dd/MM/yyyy)', () => {
        it('Then: invalid date format error message should be displayed', async () => {
            fireEvent.input(screen.getByRole('textbox', { name: 'Data urodzenia' }), { target: { value: '15/01/1899' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(await screen.findAllByText(/Podaj późniejszą datę/i)).toHaveLength(1);
            expect(screen.getByRole('textbox', { name: 'Data urodzenia'}).value).toBe('15/01/1899');
        })
    })
    describe('When: properly filled form is submitted', () => {
        it('Then: handleSubmit is invoked', async () => {
            fireEvent.input(screen.getByRole('textbox', { name: 'Imię' }), { target: { value: 'Jan' }});
            fireEvent.input(screen.getByRole('textbox', { name: 'Nazwisko' }), { target: { value: 'Kowalski' }});
            fireEvent.input(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'jan.kowalski@gmail.com' }});
            fireEvent.input(screen.getByLabelText(/Hasło/), { target: { value: 'ZAQ!2wsx' }});
            fireEvent.input(screen.getByLabelText(/Powtórz hasło/), { target: { value: 'ZAQ!2wsx' }});
            fireEvent.input(screen.getByRole('textbox', { name: 'Telefon' }), { target: { value: 123456789 }});
            fireEvent.input(screen.getByRole('textbox', { name: 'Data urodzenia' }), { target: { value: '19/03/1970' }});
            fireEvent.submit(screen.getByTestId('formSubmit'));
            expect(screen.getByRole('textbox', { name: 'Imię'}).value).toBe('Jan');
            expect(screen.getByRole('textbox', { name: 'Nazwisko'}).value).toBe('Kowalski');
            expect(screen.getByRole('textbox', { name: 'Email'}).value).toBe('jan.kowalski@gmail.com');
            expect(screen.getByLabelText(/Hasło/).value).toBe('ZAQ!2wsx');
            expect(screen.getByLabelText(/Powtórz hasło/).value).toBe('ZAQ!2wsx');
            expect(screen.getByRole('textbox', { name: 'Telefon'}).value).toBe('123456789');
            expect(screen.getByRole('textbox', { name: 'Data urodzenia'}).value).toBe('19/03/1970');
        })
    })
})