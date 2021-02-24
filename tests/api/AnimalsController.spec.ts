import request from 'supertest';
import { AnimalCreationParams, AnimalsService } from '../../src/application/AnimalsService';
import { api } from '../../src/presentation/rest/Api';
import { Animal } from '../../src/infrastructure/postgres/Animal';
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
        const data: AnimalCreationParams = { name: 'Bob', age: 99 };
        const expectedAnimal: Animal = { id, ...data };

        animalServiceMock.update.mockImplementationOnce((animal) => Promise.resolve(animal));

        request(app)
            .put(`/api/animals/${id}`)
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, expectedAnimal, done);
    });

    it('Update with empty data should return 400', (done) => {
        const id = 1;
        const data = {};

        request(app).put(`/api/animals/${id}`).send(data).set('Accept', 'application/json').expect(400, done);
    });

    it('Update with float id should return 400', (done) => {
        const id = 1.124;
        const data: AnimalCreationParams = { name: 'Bob', age: 99 };

        request(app).put(`/api/animals/${id}`).send(data).set('Accept', 'application/json').expect(400, done);
    });
});
