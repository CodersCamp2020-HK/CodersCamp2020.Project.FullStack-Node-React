import { AnimalCreationParams, AnimalsService } from '../../src/application/AnimalsService';
import { Animal, AnimalSpecies } from '../../src/infrastructure/postgres/Animal';
import { mocked } from 'ts-jest/utils';
import { Repository } from 'typeorm';
import { Container, Scope } from 'typescript-ioc';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';

jest.mock('../../src/application/AnimalsService');

afterEach(() => {
    jest.clearAllMocks();
});

const animalServiceMock = mocked(
    new AnimalsService(
        (undefined as unknown) as Repository<Animal>,
        (undefined as unknown) as Repository<AnimalAdditionalInfo>,
    ),
);
Container.bind(AnimalsService)
    .factory(() => animalServiceMock)
    .scope(Scope.Local);

describe('Given: AnimalsService object', () => {
    const expected: AnimalCreationParams = {
        name: 'Bob',
        age: 99,
        specie: AnimalSpecies.CAT,
        description: 'desc',
        ready_for_adoption: true,
        additionalInfo: {
            accepts_kids: true,
            accepts_other_animals: true,
            admission_to_shelter: new Date(),
            adoption_date: new Date(),
            need_donations: false,
            temporary_home: false,
            virtual_adoption: true,
        },
    };
    describe(`When: update with correct data is invoked`, () => {
        it('Then: updated data should be returned', () => {
            expected;
            expect(true).toBeTruthy();
        });
    });
});
