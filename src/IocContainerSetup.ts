/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Container, Scope } from 'typescript-ioc';
import { AnimalsService } from '@application/AnimalsService';
import { UsersService } from '@application/UsersService';
import { getConnection } from 'typeorm';
import { Animal } from '@infrastructure/postgres/Animal';
import { User } from '@infrastructure/postgres/User';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { QuestionnaireService } from '@application/QuestionnaireService';
import { Questionnaire } from '@infrastructure/postgres/Questionnaire';
import { TemporaryUserLinkInfoStore } from '@application/TemporaryUserLinkInfoStore';
// import { UsersService } from '@application/UsersService';
// import { User } from '@infrastructure/postgres/User';

Container.bind(AnimalsService)
    .factory(
        () =>
            new AnimalsService(
                getConnection().getRepository(Animal),
                getConnection().getRepository(AnimalAdditionalInfo),
            ),
    )
    .scope(Scope.Local);

Container.bind(UsersService).factory(() => new UsersService(getConnection().getRepository(User)));
Container.bind(QuestionnaireService)
    .factory(() => new QuestionnaireService(getConnection().getRepository(Questionnaire)))
    .scope(Scope.Local);
Container.bind(TemporaryUserLinkInfoStore)
    .factory(() => new TemporaryUserLinkInfoStore(30))
    .scope(Scope.Singleton);
