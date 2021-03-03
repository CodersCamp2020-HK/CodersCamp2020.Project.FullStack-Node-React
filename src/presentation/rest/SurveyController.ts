import { SurveyService } from '@application/SurveyService';
import ApiError from '@infrastructure/ApiError';
import { Questionnaire } from '@infrastructure/postgres/Survey';
import { Controller, Get, Path, Route, Tags, Response } from 'tsoa';
import { Inject } from 'typescript-ioc';
// import ApiError from '@infrastructure/ApiError';

@Tags('Surveys')
@Route('surveys')
export class SurveyController extends Controller {
    @Inject
    private surveyService!: SurveyService;

    @Response<ApiError>(404, 'Survey not found')
    @Get('{surveyId}')
    public async getSurvey(@Path() surveyId: number): Promise<Questionnaire> {
        return this.surveyService.get(surveyId);
    }

    @Response<ApiError>(404, 'Surveys not found')
    @Get()
    public async getAllSurvey(): Promise<Questionnaire[]> {
        return this.surveyService.getAll();
    }
}
