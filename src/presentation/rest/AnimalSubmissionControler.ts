import { AnimalSubmissionsService } from '@application/AnimalSubmissionsService';
import { Get, Route, Tags, Query, Controller, Response, SuccessResponse } from 'tsoa';
import { Inject } from 'typescript-ioc';

@Tags('Submissions')
@Route('submissions')
export class AnimalSubmissionsController extends Controller {
    @Inject
    private submissionService!: AnimalSubmissionsService;

    @Response('500', 'Internal Server Error')
    @SuccessResponse('200', 'Ok')
    @Get('allWillignessesToAdoptCount')
    public async getAllWillignessesToAdoptCount(@Query() petName: string): Promise<number> {
        this.setStatus(200);
        return this.submissionService.adoptWillingnessCounter(petName);
    }
}
