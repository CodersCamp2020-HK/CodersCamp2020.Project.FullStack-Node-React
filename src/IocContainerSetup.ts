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
import { AnimalPhoto } from '@infrastructure/postgres/AnimalPhoto';
import { PhotosService } from '@application/PhotosService';
import { EmailService } from '@infrastructure/EmailService';
import TemporaryUserActivationInfoStore from '@infrastructure/TemporaryUserActivationInfoStore';

Container.bind(AnimalsService)
    .factory(
        () =>
            new AnimalsService(
                getConnection().getRepository(Animal),
                getConnection().getRepository(AnimalAdditionalInfo),
                getConnection().getRepository(AnimalPhoto),
            ),
    )
    .scope(Scope.Local);

Container.bind(UsersService).factory(() => new UsersService(getConnection().getRepository(User)));
Container.bind(QuestionnaireService)
    .factory(() => new QuestionnaireService(getConnection().getRepository(Questionnaire)))
    .scope(Scope.Local);
Container.bind(PhotosService)
    .factory(() => new PhotosService())
    .scope(Scope.Local);
Container.bind(EmailService).factory(() => new EmailService());
Container.bind(TemporaryUserActivationInfoStore)
    .factory(() => new TemporaryUserActivationInfoStore(120))
    .scope(Scope.Singleton);
