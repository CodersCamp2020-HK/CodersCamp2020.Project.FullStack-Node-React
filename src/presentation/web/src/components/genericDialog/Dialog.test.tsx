import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import muiWrapper from '../../testUtils/muiWrapper';
import Dialog from './Dialog';

const dialogProps = {
    title: 'My dialog',
    content: 'Lorem ipsum dor si amet',
    actionText: 'Wyślij',
    isOpen: true,
};

let documentBody: RenderResult;
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

const mockHandleAction = jest.fn();

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
