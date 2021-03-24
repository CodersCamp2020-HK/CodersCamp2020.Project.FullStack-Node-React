/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Container, Scope } from 'typescript-ioc';
import { AnimalsService } from '@application/AnimalsService';
import { UsersService } from '@application/UsersService';
import { getConnection } from 'typeorm';
import { AnimalPhoto } from '@infrastructure/postgres/AnimalPhoto';
import { PhotosService } from '@application/PhotosService';
import Animal from '@infrastructure/postgres/Animal';
import User from '@infrastructure/postgres/User';
import AnimalAdditionalInfo from '@infrastructure/postgres/AnimalAdditionalInfo';
import { FormService } from '@application/FormService';
import Form from '@infrastructure/postgres/Form';
import OrganizationUser from '@infrastructure/postgres/OrganizationUser';
import { EmailService } from '@infrastructure/EmailService';
import TemporaryUserActivationInfoStore from '@infrastructure/TemporaryUserActivationInfoStore';
import { CalendarService } from '@application/CalendarService';
import Calendar from '@infrastructure/postgres/Calendar';
import FormVolunteerSubmission from '@infrastructure/postgres/FormVolunteerSubmission';
import { VolunteerSubmissionsService } from '@application/VolunteerSubmissionsService';
import { AnimalSubmissionsService } from '@application/AnimalSubmissionsService';
import FormAnimalSubmission from '@infrastructure/postgres/FormAnimalSubmission';
import { WinstonLogger } from '@infrastructure/WinstonLogger';
import Specie from '@infrastructure/postgres/Specie';
import FormVolunteerAnswer from '@infrastructure/postgres/FormVolunteerAnswer';
import FormAnimalAnswer from '@infrastructure/postgres/FormAnimalAnswer';

Container.bind(AnimalsService)
    .factory(
        () =>
            new AnimalsService(
                getConnection().getRepository(Animal),
                getConnection().getRepository(AnimalAdditionalInfo),
                getConnection().getRepository(AnimalPhoto),
                getConnection().getRepository(Specie),
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
Container.bind(PhotosService)
    .factory(() => new PhotosService())
    .scope(Scope.Local);
Container.bind(EmailService).factory(() => new EmailService());
Container.bind(TemporaryUserActivationInfoStore)
    .factory(() => new TemporaryUserActivationInfoStore(120))
    .scope(Scope.Singleton);

Container.bind(CalendarService).factory(
    () =>
        new CalendarService(
            getConnection().getRepository(Calendar),
            getConnection().getRepository(Animal),
            getConnection().getRepository(User),
        ),
);
Container.bind(AnimalSubmissionsService).factory(
    () =>
        new AnimalSubmissionsService(
            getConnection().getRepository(FormAnimalSubmission),
            getConnection().getRepository(Animal),
            getConnection().getRepository(FormAnimalAnswer),
            getConnection().getRepository(OrganizationUser),
        ),
);
Container.bind(VolunteerSubmissionsService).factory(
    () =>
        new VolunteerSubmissionsService(
            getConnection().getRepository(FormVolunteerSubmission),
            getConnection().getRepository(FormVolunteerAnswer),
        ),
);
Container.bind(WinstonLogger).to(WinstonLogger).scope(Scope.Singleton);

export { Container };
