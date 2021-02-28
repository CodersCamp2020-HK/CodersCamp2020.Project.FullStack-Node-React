import { PersonalInfoCreationParams, PersonalInfoService } from '@application/PersonalInfoService';
import { PersonalInfo } from '@infrastructure/postgres/PersonalInfo';
import { Get, Body, Controller, Post, Route, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';

@Tags('Personal info form')
@Route('personal_info')
export class PersonalInfoController extends Controller {
    @Inject
    private personalInfoService!: PersonalInfoService;
    @Get()
    public async getPersonalInfoForm(): Promise<PersonalInfo[]> {
        return this.personalInfoService.getPersonalForm();
    }
    @Post()
    public async postPersonalInfoForm(@Body() requestBody: PersonalInfoCreationParams): Promise<PersonalInfo> {
        return this.personalInfoService.createPersonalForm(requestBody);
    }
}
