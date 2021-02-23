import request from 'supertest';
import { AnimalCreationParams, AnimalsService } from '../../src/application/AnimalsService';
import { api } from '../../src/presentation/rest/Api';
import { Animal } from '../../src/entity/Animal';
import { mocked } from 'ts-jest/utils';
import { Repository } from 'typeorm';
import { Container, Scope } from 'typescript-ioc';
import express from 'express';

jest.mock('../../src/application/AnimalsService');

afterEach(() => {
    jest.clearAllMocks();
});

//banał
const animalServiceMock = mocked(new AnimalsService((undefined as unknown) as Repository<Animal>));
Container.bind(AnimalsService)
    .factory(() => animalServiceMock)
    .scope(Scope.Local);

const app = express();
app.use(api);

describe('PUT /animals/{id}', () => {
    it('Update with valid data should return 200', (done) => {
        const id = 1;
        const sendData: AnimalCreationParams = { name: 'Bob', age: 99 };
        const expectedAnimal: Animal = { id, ...sendData };

        animalServiceMock.update.mockImplementationOnce((animal) => Promise.resolve(animal));

        request(app)
            .put(`/api/animals/${id}`)
            .send(sendData)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, expectedAnimal, done);
    });
});
