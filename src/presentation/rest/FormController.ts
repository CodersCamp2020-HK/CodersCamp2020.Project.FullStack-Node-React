import { Body, Controller, Post, Get, Path, Route, SuccessResponse, Tags, Response, Security } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { FormCreationParams, FormService } from '@application/FormService';
import ApiError from '@infrastructure/ApiError';
import Form from '@infrastructure/postgres/Form';
import { ValidateErrorJSON } from '@application/UsersErrors';
import AdoptionStep from '@infrastructure/postgres/AdoptionStep';

@Tags('Form')
@Route('forms')
export class FormController extends Controller {
    @Inject
    private formService!: FormService;

    /**
     * Post a form and throws information about success
     * @param requestBody includes 'name', 'questions' of form
     */
    @Security('jwt', ['admin', 'employee'])
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @Response(400, 'Bad request')
    @Response<ApiError>(404, 'Not Found')
    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse(201, 'created')
    @Post()
    public async createForm(@Body() requestBody: FormCreationParams): Promise<void> {
        await this.formService.create(requestBody);
        this.setStatus(201);
        return;
    }

    /**
     * Supply an ID of survey and get it from database
     * @param surveyId ID of survey (number)
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<ApiError>(404, 'Survey not found')
    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse(200, 'ok')
    @Get('{surveyId}')
    public async getForm(@Path() surveyId: number): Promise<AdoptionStep> {
        return this.formService.get(surveyId);
    }

    /**
     * Get all surveys applied by users
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<ApiError>(404, 'Surveys not found')
    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse(200, 'ok')
    @Get()
    public async getAllForms(): Promise<Form[]> {
        return this.formService.getAll();
    }
}
