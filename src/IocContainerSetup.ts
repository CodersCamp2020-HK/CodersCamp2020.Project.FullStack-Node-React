/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AdoptionStepService } from '@application/AdoptionStepService';
import { AnimalsService } from '@application/AnimalsService';
import { AnimalSubmissionsService } from '@application/AnimalSubmissionsService';
import { CalendarService } from '@application/CalendarService';
import { FormService } from '@application/FormService';
import { PhotosService } from '@application/PhotosService';
import { UsersService } from '@application/UsersService';
import { VolunteerHireStepService } from '@application/VolunteerHireStepService';
import { VolunteerSubmissionsService } from '@application/VolunteerSubmissionsService';
import { EmailService } from '@infrastructure/EmailService';
import AdoptionStep from '@infrastructure/postgres/AdoptionStep';
import Animal from '@infrastructure/postgres/Animal';
import AnimalAdditionalInfo from '@infrastructure/postgres/AnimalAdditionalInfo';
import { AnimalPhoto } from '@infrastructure/postgres/AnimalPhoto';
import Calendar from '@infrastructure/postgres/Calendar';
import Form from '@infrastructure/postgres/Form';
import FormAnimalAnswer from '@infrastructure/postgres/FormAnimalAnswer';
import FormAnimalSubmission from '@infrastructure/postgres/FormAnimalSubmission';
import FormVolunteerAnswer from '@infrastructure/postgres/FormVolunteerAnswer';
import FormVolunteerSubmission from '@infrastructure/postgres/FormVolunteerSubmission';
import OrganizationUser from '@infrastructure/postgres/OrganizationUser';
import Specie from '@infrastructure/postgres/Specie';
import User from '@infrastructure/postgres/User';
import VolunteerHireStep from '@infrastructure/postgres/VolunteerHireStep';
import TemporaryUserActivationInfoStore from '@infrastructure/TemporaryUserActivationInfoStore';
import { WinstonLogger } from '@infrastructure/WinstonLogger';
import { getConnection } from 'typeorm';
import { Container, Scope } from 'typescript-ioc';
import { OrganizationUsersService } from '@application/OrganizationUsersService';

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
    .factory(
        () =>
            new FormService(
                getConnection().getRepository(Form),
                getConnection().getRepository(Animal),
                getConnection().getRepository(AdoptionStep),
            ),
    )
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
            getConnection().getRepository(OrganizationUser),
        ),
);
Container.bind(AdoptionStepService).factory(
    () => new AdoptionStepService(getConnection().getRepository(AdoptionStep), getConnection().getRepository(Specie)),
);
Container.bind(VolunteerHireStepService).factory(
    () => new VolunteerHireStepService(getConnection().getRepository(VolunteerHireStep)),
);
Container.bind(OrganizationUsersService).factory(
    () => new OrganizationUsersService(getConnection().getRepository(OrganizationUser)),
);
Container.bind(WinstonLogger).to(WinstonLogger).scope(Scope.Singleton);

export { Container };
