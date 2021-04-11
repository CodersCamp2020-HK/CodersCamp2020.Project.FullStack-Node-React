import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import muiWrapper from '../../../testUtils/muiWrapper';
import Dialog from './Dialog';

const mockHandleAction = jest.fn();
let documentBody: RenderResult;

const dialogProps = {
    title: 'My dialog',
    content: 'Lorem ipsum dor si amet',
    actionText: 'Wyślij',
    handleAction: mockHandleAction,
};

describe('Hidden dialog', () => {
    beforeEach(() => {
        documentBody = render(muiWrapper(<Dialog {...dialogProps} isOpen={false} />));
    });

    it('hide all text getted as props', () => {
        expect(documentBody.queryByText(dialogProps.title)).not.toBeInTheDocument();
        expect(documentBody.queryByText(dialogProps.content)).not.toBeInTheDocument();
        expect(documentBody.queryByText(dialogProps.actionText)).not.toBeInTheDocument();
    });
});

describe('Dialog without textarea', () => {
    beforeEach(() => {
        documentBody = render(muiWrapper(<Dialog {...dialogProps} isOpen={true} />));
    });

    it('show all text getted as props', () => {
        expect(documentBody.getByText(dialogProps.title)).toBeInTheDocument();
        expect(documentBody.getByText(dialogProps.content)).toBeInTheDocument();
        expect(documentBody.getByText(dialogProps.actionText)).toBeInTheDocument();
    });

    it('show return button', async () => {
        const button = await documentBody.findByTestId('return');
        expect(button).toBeInTheDocument();
    });

    it('hide dialog after click return button', async () => {
        const button = await documentBody.findByTestId('return');
        const dialogTitle = await documentBody.findByTestId('title');
        fireEvent.click(button);
        expect(dialogTitle).not.toBeVisible();
    });

    it('call action callback', async () => {
        await act(async () => {
            const button = await documentBody.findByTestId('action');
            fireEvent.click(button);
        });

        expect(mockHandleAction).toBeCalledTimes(1);
    });
});

describe('Dialog with textarea', () => {
    beforeEach(() => {
        documentBody = render(muiWrapper(<Dialog {...dialogProps} isOpen={true} textarea={true} />));
    });

    it('show all text getted as props', () => {
        expect(documentBody.getByText(dialogProps.title)).toBeInTheDocument();
        expect(documentBody.getByText(dialogProps.content)).toBeInTheDocument();
        expect(documentBody.getByText(dialogProps.actionText)).toBeInTheDocument();
    });

    it('show return button', async () => {
        const button = await documentBody.findByTestId('return');
        expect(button).toBeInTheDocument();
    });

    it('hide dialog after click return button', async () => {
        const button = await documentBody.findByTestId('return');
        const dialogTitle = await documentBody.findByTestId('title');
        fireEvent.click(button);
        expect(dialogTitle).not.toBeVisible();
    });

    it('do not call action callback if textarea is empty', async () => {
        await act(async () => {
            const button = await documentBody.findByTestId('action');
            fireEvent.click(button);
        });

        expect(mockHandleAction).not.toHaveBeenCalled();
    });

    it('show error if textarea is empty', async () => {
        await act(async () => {
            const button = await documentBody.findByTestId('action');
            fireEvent.click(button);
        });

        expect(documentBody.queryByText('Pole jest wymagane')).toBeVisible();
    });

    it('give textarea text to callback function', async () => {
        const exampleText = 'I am example text';
        const textarea = await documentBody.findByTestId('textarea');
        await act(async () => {
            fireEvent.change(textarea, { target: { value: exampleText } });
            const button = await documentBody.findByTestId('action');
            fireEvent.click(button);
        });

        expect(textarea).toHaveValue(exampleText);
        expect(documentBody.queryByText('Pole jest wymagane')).not.toBeInTheDocument();
        expect(mockHandleAction).toBeCalledWith(exampleText);
        expect(mockHandleAction).not.toBeCalledWith('wrong text');
    });
});
