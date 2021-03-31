import { render, RenderResult } from '@testing-library/react';
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
            />,
        ),
    );
});

const mockHandleAction = jest.fn();

it('show dialog title and content', () => {
    expect(documentBody.getByText(dialogProps.title)).toBeTruthy();
    expect(documentBody.getByText(dialogProps.content)).toBeTruthy();
});
