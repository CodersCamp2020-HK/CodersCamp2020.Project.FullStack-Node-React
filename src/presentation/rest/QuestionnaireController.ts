import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { QuestionnaireCreationParams, QuestionnaireService } from '@application/QuestionnaireService';

@Tags('Questionnaire')
@Route('Questionnaire')
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
}
