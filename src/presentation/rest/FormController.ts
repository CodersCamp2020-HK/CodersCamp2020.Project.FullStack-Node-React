import { Body, Controller, Post, Get, Path, Route, SuccessResponse, Tags, Response } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { FormCreationParams, FormService } from '@application/FormService';
import ApiError from '@infrastructure/ApiError';
import Form from '@infrastructure/postgres/Form';

@Tags('Form')
@Route('forms')
export class FormController extends Controller {
    @Inject
    private formService!: FormService;

    @Response('400', 'Bad request')
    @SuccessResponse('201', 'created')
    @Post()
    public async createForm(@Body() requestBody: FormCreationParams): Promise<void> {
        await this.formService.create(requestBody);
        this.setStatus(201);
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
}
