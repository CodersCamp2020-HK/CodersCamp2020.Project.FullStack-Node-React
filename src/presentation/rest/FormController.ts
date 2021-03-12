import { Body, Controller, Post, Get, Path, Route, SuccessResponse, Tags, Response, Put } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { FormCreationParams, FormService, FormType } from '@application/FormService';
import ApiError from '@infrastructure/ApiError';
import Form from '@infrastructure/postgres/Form';
import { FormStatus } from '@infrastructure/postgres/FormVolunteerSubmission';

@Tags('Form')
@Route('forms')
export class FormController extends Controller {
    @Inject
    private formService!: FormService;

    @SuccessResponse('201', 'created')
    @Post()
    public async createForm(@Body() requestBody: FormCreationParams): Promise<void> {
        this.setStatus(201);
        this.formService.create(requestBody);
        return;
    }

    @Response<ApiError>(404, 'Survey not found')
    @Get('{surveyId}')
    public async getForm(@Path() surveyId: number): Promise<Form> {
        return this.formService.get(surveyId);
    }

    @Response<ApiError>(404, 'Surveys not found')
    @Get()
    public async getAllForms(): Promise<Form[]> {
        return this.formService.getAll();
    }

    @Put('changeStatus')
    public async changeFormStatus(@Body() formType: FormType, @Body() status: FormStatus): Promise<void> {
        await this.formService.changeStatus(formType, status);
    }
}
