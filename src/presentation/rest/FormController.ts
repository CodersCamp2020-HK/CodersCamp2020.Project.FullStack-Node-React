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

    /**
     * Post a form and throws information about success
     * @param requestBody includes 'name', 'questions' of form
     */
    @SuccessResponse('201', 'created')
    @Post()
    public async createForm(@Body() requestBody: FormCreationParams): Promise<void> {
        this.setStatus(201);
        this.formService.create(requestBody);
        return;
    }

    /**
     * Supply an ID of survey and get it from database
     * @param surveyId ID of survey (number)
     */
    @Response<ApiError>(404, 'Survey not found')
    @Get('{surveyId}')
    public async getForm(@Path() surveyId: number): Promise<Form> {
        return this.formService.get(surveyId);
    }

    /**
     * Get all surveys applied by users
     */
    @Response<ApiError>(404, 'Surveys not found')
    @Get()
    public async getAllForms(): Promise<Form[]> {
        return this.formService.getAll();
    }
}
