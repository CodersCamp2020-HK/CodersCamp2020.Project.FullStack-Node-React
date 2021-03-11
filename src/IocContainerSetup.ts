/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Container, Scope } from 'typescript-ioc';
import { AnimalsService } from '@application/AnimalsService';
import { UsersService } from '@application/UsersService';
import { getConnection } from 'typeorm';
import Animal from '@infrastructure/postgres/Animal';
import { User } from '@infrastructure/postgres/User';
import { AnimalAdditionalInfo } from '@infrastructure/postgres/AnimalAdditionalInfo';
import { FormService } from '@application/FormService';
import Form from '@infrastructure/postgres/Form';
import OrganizationUser from '@infrastructure/postgres/OrganizationUser';

Container.bind(AnimalsService)
    .factory(
        () =>
            new AnimalsService(
                getConnection().getRepository(Animal),
                getConnection().getRepository(AnimalAdditionalInfo),
            ),
    )
    .scope(Scope.Local);

Container.bind(UsersService)
    .factory(
        () => new UsersService(getConnection().getRepository(User), getConnection().getRepository(OrganizationUser)),
    )
    .scope(Scope.Local);

Container.bind(FormService)
    .factory(() => new FormService(getConnection().getRepository(Form)))
    .scope(Scope.Local);
