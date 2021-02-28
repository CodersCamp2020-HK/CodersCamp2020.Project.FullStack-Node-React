import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import {
    VolunteerQuestionnaireCreationParams,
    VolunteerQuestionnaireService,
} from '@application/VolunteerQuestionnaireService';

@Tags('Volunteer')
@Route('volunteer')
export class VolunteerQuestionnaireController extends Controller {
    @Inject
    private volunteerQuestionnaireService!: VolunteerQuestionnaireService;

    @SuccessResponse('201', 'created')
    @Post()
    public async createVolunteerQuestionnaire(
        @Body() requestBody: VolunteerQuestionnaireCreationParams,
    ): Promise<void> {
        this.setStatus(201);
        this.volunteerQuestionnaireService.create(requestBody);
        return;
    }
}
