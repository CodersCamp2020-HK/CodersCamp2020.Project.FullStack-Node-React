import { Body, Controller, Post, Get, Path, Route, SuccessResponse, Tags, Response } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { QuestionnaireCreationParams, QuestionnaireService } from '@application/QuestionnaireService';
import ApiError from '@infrastructure/ApiError';
import { Questionnaire } from '@infrastructure/postgres/Questionnaire';

@Tags('Questionnaire')
@Route('questionnaires')
export class QuestionnaireController extends Controller {
    @Inject
    private questionnaireService!: QuestionnaireService;

    @SuccessResponse('201', 'created')
    @Post()
    public async createVolunteerQuestionnaire(@Body() requestBody: QuestionnaireCreationParams): Promise<void> {
        this.setStatus(201);
        this.questionnaireService.create(requestBody);
        return;
    }

    @Response<ApiError>(404, 'Survey not found')
    @Get('{surveyId}')
    public async getSurvey(@Path() surveyId: number): Promise<Questionnaire> {
        return this.questionnaireService.get(surveyId);
    }

    @Response<ApiError>(404, 'Surveys not found')
    @Get()
    public async getAllSurvey(): Promise<Questionnaire[]> {
        return this.questionnaireService.getAll();
    }
}
