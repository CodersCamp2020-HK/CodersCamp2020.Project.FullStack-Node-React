import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { useGetAnimal } from '../../client/index';
import muiWrapper from '../../testUtils/muiWrapper';
import AnimalInfoDescription from './AnimalInfoDescription';

jest.mock('../../client/index');

let documentBody: RenderResult;
let mockUseGetAnimal;
describe('Render description', () => {
    beforeEach(() => {
        mockUseGetAnimal = useGetAnimal as jest.MockedFunction<typeof useGetAnimal>
        mockUseGetAnimal.mockReturnValue({ ...jest.requireActual('../../client/index'), data: { description: 'enim ipsum' } });
        documentBody = render(muiWrapper(<AnimalInfoDescription animalId={1} />));
    });

    it('show description text', async () => {
        const desc = await documentBody.getByTestId('desc');
        expect(desc.textContent).toBe('enim ipsum');
    });
});
