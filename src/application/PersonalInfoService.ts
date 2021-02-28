import { PersonalInfo } from '@infrastructure/postgres/PersonalInfo';
import { Repository } from 'typeorm';

export type PersonalInfoCreationParams = Omit<PersonalInfo, 'id'>;

export class PersonalInfoService {
    constructor(private personalInfoRepository: Repository<PersonalInfo>) {}

    async createPersonalForm(createFormParams: PersonalInfoCreationParams): Promise<PersonalInfo> {
        const form = this.personalInfoRepository.create(createFormParams);
        return this.personalInfoRepository.save(form);
    }

    async getPersonalForm(): Promise<PersonalInfo[]> {
        const form = this.personalInfoRepository.find();
        return form;
    }
}
