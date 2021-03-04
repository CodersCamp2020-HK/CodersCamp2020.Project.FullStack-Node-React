/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Container, Scope } from 'typescript-ioc';
import { AnimalsService } from '@application/AnimalsService';
import { getConnection } from 'typeorm';
import { Animal } from '@infrastructure/postgres/Animal';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { QuestionnaireService } from '@application/QuestionnaireService';
import { Questionnaire } from '@infrastructure/postgres/Questionnaire';
import { UsersService } from '@application/UsersService';
import { User } from '@infrastructure/postgres/User';

Container.bind(AnimalsService)
    .factory(
        () =>
            new AnimalsService(
                getConnection().getRepository(Animal),
                getConnection().getRepository(AnimalAdditionalInfo),
            ),
    )
    .scope(Scope.Local);

Container.bind(QuestionnaireService)
    .factory(() => new QuestionnaireService(getConnection().getRepository(Questionnaire)))
    .scope(Scope.Local);

Container.bind(UsersService).factory(() => new UsersService(getConnection().getRepository(User)));
