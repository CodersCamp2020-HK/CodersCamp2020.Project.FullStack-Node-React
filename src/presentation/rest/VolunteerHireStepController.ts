import ApiError from '@infrastructure/ApiError';
import { Controller, Get, Response, Route, Security, SuccessResponse, Tags, Example } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { DeepPartial } from 'typeorm';
import { VolunteerHireStepService } from '@application/VolunteerHireStepService';
import VolunteerHireStep from '@infrastructure/postgres/VolunteerHireStep';

@Tags('Volunter Hire Steps')
@Route('volunteer-hire-steps')
export class VolunterHireStepsController extends Controller {
    @Inject
    private volunterHireStepService!: VolunteerHireStepService;

    /**
     * Get all volunteer hire steps
     */
    @Security('jwt', ['normal', 'volunteer', 'admin', 'employee'])
    @Response<ApiError>(401, 'Unauthorized')
    @Response<ApiError>(404, 'Volunterr hire steps not found')
    @Response<ApiError>(400, 'Bad Request')
    @Response<Error>(500, 'Internal Server Error')
    @SuccessResponse(200, 'OK')
    @Example<DeepPartial<VolunteerHireStep>>({
        name: 'Step 1: Lorem ipsum',
        number: 1,
        description: 'Step description lorem ipsum',
        organization: {
            id: 1,
        },
    })
    @Get('')
    public async getAll(): Promise<VolunteerHireStep[]> {
        return await this.volunterHireStepService.getAll();
    }
}
