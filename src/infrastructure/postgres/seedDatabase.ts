import { getConnection } from 'typeorm';

import { seedLocalizations } from './dummyData/localizations';
import Localization from './Localization';

import User from './User';
import { seedUsers } from './dummyData/users';

import { seedAnimals } from './dummyData/animals';
import Animal from './Animal';

import Specie from './Specie';
import { species } from './dummyData/species';

import AnimalAdditionalInfo from './AnimalAdditionalInfo';
import { seedAnimalAdditionalInfo } from './dummyData/animalAdditionalInfo';

import { organizations } from './dummyData/organizations';
import Organization from './Organization';

import Form from './Form';
import { seedForms } from './dummyData/forms';

import AdoptionStep from './AdoptionStep';
import { seedAdoptionStep } from './dummyData/adoptionSteps';

import AnimalHandler from './AnimalHandler';
import { seedAnimalHandlers } from './dummyData/animalsHandlers';

import Calendar from './Calendar';
import { seedCalendars } from './dummyData/calendars';

import OrganizationUser from './OrganizationUser';
import { organizationUsers } from './dummyData/organizationUsers';

import VolunteerHireStep from './VolunteerHireStep';
import { seedVolunteerHireStep } from './dummyData/volunteerHireSteps';

import { AnimalThumbnailPhoto } from './AnimalPhoto';
import { seedAnimalThumbnailPhoto } from './dummyData/animalPhoto';

import { AnimalPhoto } from './AnimalPhoto';
import { seedAnimalPhoto } from './dummyData/animalPhoto';

import FormAnimalSubmission from './FormAnimalSubmission';
import { seedFormAnimalSubmission } from './dummyData/formAnimalSubmissions';

import FormQuestion from './FormQuestion';
import { seedFormQuestion } from './dummyData/formQuestions';

import FormVolunteerSubmission from './FormVolunteerSubmission';
import { seedFormVolunteerSubmission } from './dummyData/formVolunteerSubmissions';

import FormAnimalAnswer from './FormAnimalAnswer';
import { seedFormAnimalAnswer } from './dummyData/formAnimalAnswers';

import FormVolunteerAnswer from './FormVolunteerAnswer';
import { seedFormVolunteerAnswer } from './dummyData/formVolunteerAnswers';

export default async function seedDatabase(): Promise<void> {
    await getConnection().synchronize(true);
    await getConnection().getRepository(AnimalAdditionalInfo).save(seedAnimalAdditionalInfo(10));
    await getConnection().getRepository(AnimalThumbnailPhoto).save(seedAnimalThumbnailPhoto(10));

    await getConnection().getRepository(Specie).save(species);
    await getConnection().getRepository(Animal).save(seedAnimals());
    await getConnection().getRepository(AnimalPhoto).save(seedAnimalPhoto(10));
    await getConnection().getRepository(Localization).save(seedLocalizations(5));
    await getConnection()
        .getRepository(User)
        .save(await seedUsers(5));
    await getConnection().getRepository(Organization).save(organizations);
    await getConnection().getRepository(Form).save(seedForms());
    await getConnection().getRepository(AdoptionStep).save(seedAdoptionStep());
    await getConnection().getRepository(AnimalHandler).save(seedAnimalHandlers(5));
    await getConnection().getRepository(Calendar).save(seedCalendars(5));
    await getConnection().getRepository(OrganizationUser).save(organizationUsers);
    await getConnection().getRepository(VolunteerHireStep).save(seedVolunteerHireStep());
    await getConnection().getRepository(FormAnimalSubmission).save(seedFormAnimalSubmission());
    await getConnection().getRepository(FormQuestion).save(seedFormQuestion());
    await getConnection().getRepository(FormVolunteerSubmission).save(seedFormVolunteerSubmission());
    await getConnection().getRepository(FormAnimalAnswer).save(seedFormAnimalAnswer());
    await getConnection().getRepository(FormVolunteerAnswer).save(seedFormVolunteerAnswer());
}

// async function seedAndClose() {
//     await connectToDb();
//     await seedDatabase();
//     process.exit();
// }

// seedAndClose();
