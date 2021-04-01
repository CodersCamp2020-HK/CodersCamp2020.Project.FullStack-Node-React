import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import muiWrapper from '../../testUtils/muiWrapper';
import Dialog from './Dialog';

const mockHandleAction = jest.fn();
let documentBody: RenderResult;

describe('Hidden dialog', () => {
    const dialogProps = {
        title: 'My dialog',
        content: 'Lorem ipsum dor si amet',
        actionText: 'Wyślij',
        isOpen: false,
    };

    beforeEach(() => {
        documentBody = render(
            muiWrapper(
                <Dialog
                    title={dialogProps.title}
                    content={dialogProps.content}
                    isOpen={dialogProps.isOpen}
                    actionText={dialogProps.actionText}
                    handleAction={mockHandleAction}
                />,
            ),
        );
    });

    it('hide all text getted as props', () => {
        expect(documentBody.queryByText(dialogProps.title)).not.toBeInTheDocument();
        expect(documentBody.queryByText(dialogProps.content)).not.toBeInTheDocument();
        expect(documentBody.queryByText(dialogProps.actionText)).not.toBeInTheDocument();
    });
});

describe('Dialog without textarea', () => {
    const dialogProps = {
        title: 'My dialog',
        content: 'Lorem ipsum dor si amet',
        actionText: 'Wyślij',
        isOpen: true,
    };

    beforeEach(() => {
        documentBody = render(
            muiWrapper(
                <Dialog
                    title={dialogProps.title}
                    content={dialogProps.content}
                    isOpen={dialogProps.isOpen}
                    actionText={dialogProps.actionText}
                    handleAction={mockHandleAction}
                />,
            ),
        );
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
